import type { Express, Request, Response } from 'express';

// Let Express parse the raw JSON stream so its explicit 4 MB limit is applied.
export const config = {
  api: { bodyParser: false },
  maxDuration: 60,
};

let expressAppPromise: Promise<Express> | undefined;
const SAFE_ERROR_NAMES = new Set([
  'Error', 'TypeError', 'RangeError', 'ReferenceError', 'SyntaxError',
  'GoogleGenerativeAIError', 'GoogleGenerativeAIResponseError', 'PostgrestError',
]);
const SAFE_ERROR_CODES = new Set([
  'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN',
  'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_SOCKET',
  'PGRST116', 'PGRST205', '23503', '23505', '40001',
]);

function logSafeError(context: string, error: unknown) {
  const candidate = error as { name?: unknown; code?: unknown; status?: unknown } | null;
  const metadata = {
    name: typeof candidate?.name === 'string' && SAFE_ERROR_NAMES.has(candidate.name)
      ? candidate.name
      : 'OtherError',
    code: typeof candidate?.code === 'string' && SAFE_ERROR_CODES.has(candidate.code)
      ? candidate.code
      : 'Other',
    status: typeof candidate?.status === 'number' && Number.isInteger(candidate.status) &&
      candidate.status >= 400 && candidate.status <= 599
      ? candidate.status
      : undefined,
  };
  console.error(`[WasteSort] ${context}`, metadata);
}

function loadExpressApp(): Promise<Express> {
  // Dynamic import lets the handler report module/Express initialization failures
  // instead of letting the platform return an unlogged invocation error.
  expressAppPromise ??= import('../server/index').then((module) => module.default);
  return expressAppPromise;
}

export default async function handler(req: Request, res: Response) {
  let app: Express;
  try {
    app = await loadExpressApp();
  } catch (error) {
    logSafeError('Express initialization failed', error);
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
    return;
  }

  // Vercel catch-all functions can receive the path with or without the /api
  // prefix. Normalize it so all existing Express route paths remain unchanged.
  const requestUrl = req.url || '/';
  if (!requestUrl.startsWith('/api/')) {
    req.url = `/api${requestUrl.startsWith('/') ? requestUrl : `/${requestUrl}`}`;
  }

  try {
    app(req, res);
  } catch (error) {
    logSafeError('Express request dispatch failed', error);
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
  }
}
