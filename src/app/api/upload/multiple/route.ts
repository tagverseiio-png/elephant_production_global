import { NextRequest } from 'next/server';

// Proxy gallery multi-file uploads to the Express backend.
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/upload/multiple`, {
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
    console.error('Upload multiple proxy error:', error);
    return Response.json(
      { error: 'Upload proxy failed' },
      { status: 502 }
    );
  }
}
