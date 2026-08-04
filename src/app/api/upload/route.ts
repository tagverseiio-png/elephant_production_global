import { NextRequest } from 'next/server';

// Proxy single-file uploads to the Express backend.
// Uses streaming to avoid buffering large files in memory (videos up to 100MB).
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const runtime = 'edge'; // Edge runtime for streaming support

export async function POST(request: NextRequest) {
  try {
    // Stream the raw body directly to the backend — no buffering
    const backendRes = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      headers: {
        'content-type': request.headers.get('content-type') || '',
      },
      body: request.body,
      // @ts-expect-error -- duplex needed for streaming request bodies
      duplex: 'half',
    });

    const data = await backendRes.json();

    return Response.json(data, { status: backendRes.status });
  } catch (error) {
    console.error('Upload proxy error:', error);
    return Response.json(
      { error: 'Upload proxy failed' },
      { status: 502 }
    );
  }
}
