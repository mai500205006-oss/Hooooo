import { APP_NAME, env } from '@config';

/**
 * Logger خفيف — بديل موحّد لاستخدام console.* المباشر في الكود.
 * دلوقتي بيطبع على console بس مع prefix ثابت، لكن لما يبقى فيه حاجة
 * حقيقية (إرسال لخدمة خارجية مثلاً) هيتغيّر من هنا بس، مش من كل مكان.
 */

type LogContext = Record<string, unknown> | undefined;

function prefix(scope?: string): string {
  return scope ? `[${APP_NAME}:${scope}]` : `[${APP_NAME}]`;
}

export const logger = {
  debug(message: string, context?: LogContext, scope?: string): void {
    if (!env.isDev) return;
    console.debug(prefix(scope), message, context ?? '');
  },

  info(message: string, context?: LogContext, scope?: string): void {
    console.info(prefix(scope), message, context ?? '');
  },

  warn(message: string, context?: LogContext, scope?: string): void {
    console.warn(prefix(scope), message, context ?? '');
  },

  error(message: string, error?: unknown, scope?: string): void {
    console.error(prefix(scope), message, error ?? '');
  },
};
