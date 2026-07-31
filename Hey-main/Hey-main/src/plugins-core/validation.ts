/**
 * PluginValidation — تحقق بسيط من الحقول المطلوبة في PluginManifest.
 * Pure functions بس، مفيش أي Side Effects أو تسجيل هنا.
 */

import type { PluginManifest } from './contract';

export interface PluginValidationResult {
  valid: boolean;
  errors: string[];
}

const REQUIRED_STRING_FIELDS: (keyof PluginManifest)[] = ['id', 'name', 'version'];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/** يتحقق إن الحقول المطلوبة (id, name, version) موجودة ومش فاضية */
export function validatePluginManifest(manifest: PluginManifest): PluginValidationResult {
  const errors: string[] = [];

  for (const field of REQUIRED_STRING_FIELDS) {
    if (!isNonEmptyString(manifest[field])) {
      errors.push(`Missing or invalid required field: "${String(field)}"`);
    }
  }

  return { valid: errors.length === 0, errors };
}
