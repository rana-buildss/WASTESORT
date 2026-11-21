import type { Request, Response } from 'express';
import app from '../server/index';

// Let Express parse the raw JSON stream so its explicit 4 MB limit is applied.
export const config = {
  api: { bodyParser: false },
  maxDuration: 120,
};

export default function handler(req: Request, res: Response) {
  // Vercel catch-all functions can receive the path with or without the /api
  // prefix. Normalize it so all existing Express route paths remain unchanged.
  const requestUrl = req.url || '/';
  if (!requestUrl.startsWith('/api/')) {
    req.url = `/api${requestUrl.startsWith('/') ? requestUrl : `/${requestUrl}`}`;
  }
  return app(req, res);
}
