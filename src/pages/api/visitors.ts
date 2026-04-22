import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Visitor counter API using Vercel KV (Upstash Redis).
 *
 * Setup steps (one-time, in Vercel dashboard):
 *  1. Go to your project → Storage → Create Database → KV (Upstash Redis)
 *  2. Vercel will automatically inject KV_REST_API_URL and KV_REST_API_TOKEN
 *     as environment variables into your deployment.
 *  3. For local development, copy those values into a .env.local file:
 *       KV_REST_API_URL=<your-url>
 *       KV_REST_API_TOKEN=<your-token>
 */

type Data = { count: number } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    // KV not configured — return 0 silently so the UI degrades gracefully
    return res.status(200).json({ count: 0 });
  }

  try {
    const { kv } = await import("@vercel/kv");

    if (req.method === "POST") {
      // Increment and return new count
      const count = await kv.incr("visitor_count");
      return res.status(200).json({ count });
    } else {
      // GET — return current count without incrementing
      const raw = await kv.get<number>("visitor_count");
      const count = raw ?? 0;
      return res.status(200).json({ count });
    }
  } catch {
    return res.status(200).json({ count: 0 });
  }
}
