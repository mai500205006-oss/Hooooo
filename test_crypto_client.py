#!/usr/bin/env python3
import base64
import hashlib
import json
import os
from datetime import datetime
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad


class RedCipher:
    def __init__(self, key_material: bytes):
        self.key = hashlib.sha256(key_material).digest()

    def encrypt(self, raw_data):
        if isinstance(raw_data, str):
            raw_data = raw_data.encode("utf-8")
        iv = os.urandom(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        encrypted_data = cipher.encrypt(pad(raw_data, AES.block_size))
        return base64.b64encode(iv + encrypted_data).decode("utf-8")

    def decrypt(self, enc_data):
        enc_data = base64.b64decode(enc_data)
        iv = enc_data[: AES.block_size]
        cipher_text = enc_data[AES.block_size :]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(cipher_text), AES.block_size).decode("utf-8")


def load_secret(env_path):
    if not os.path.exists(env_path):
        return None
    with open(env_path, "r", encoding="utf-8") as fp:
        for line in fp:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if line.startswith("SECRET_PASSPHRASE="):
                return line.split("=", 1)[1].strip()
    return None


def build_cipher():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    env_path = os.path.join(script_dir, "Atlas Platform", "Atlas Platform", ".env")
    secret = load_secret(env_path) or "test-secret-123"
    key_material = secret.encode("utf-8") + datetime.now().strftime("%Y-%m-%d").encode("utf-8")
    return RedCipher(key_material)


def main():
    cipher = build_cipher()
    agent_id = "test-agent-001"
    payload = {
        "agent_id": agent_id,
        "info": {
            "os": "Linux",
            "user": "sandbox",
            "hostname": "local-test",
            "version": "1.0.0",
        },
    }

    encrypted_payload = cipher.encrypt(json.dumps(payload))
    request_body = {
        "agent_id": agent_id,
        "data": encrypted_payload,
    }

    url = "http://127.0.0.1:9001/api/hive/checkin"
    data = json.dumps(request_body).encode("utf-8")
    headers = {"Content-Type": "application/json"}
    req = Request(url, data=data, headers=headers, method="POST")

    print("[*] Sending encrypted check-in to", url)
    try:
        with urlopen(req, timeout=15) as resp:
            resp_text = resp.read().decode("utf-8")
            print("[*] HTTP", resp.status)
            print("[*] Raw response:", resp_text)
            try:
                resp_json = json.loads(resp_text)
            except json.JSONDecodeError:
                print("[!] Response is not JSON")
                return

            if "data" not in resp_json:
                print("[!] Server did not return encrypted data:", resp_json)
                return

            decrypted_response = cipher.decrypt(resp_json["data"])
            print("[*] Decrypted backend response:")
            print(decrypted_response)
    except HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(f"[!] HTTPError {exc.code}: {exc.reason}")
        print(body)
    except URLError as exc:
        print(f"[!] URLError: {exc.reason}")
    except Exception as exc:
        print(f"[!] Unexpected error: {exc}")


if __name__ == "__main__":
    main()
