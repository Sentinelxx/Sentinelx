import { createSecureHeaders } from 'next-secure-headers';
import { NextConfig } from 'next';

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' http://localhost:3000;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.trim().replace(/\n/g, ' ');

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: createSecureHeaders({
        forceHTTPSRedirect: [
          true,
          { maxAge: 63072000, includeSubDomains: true, preload: true },
        ],
      }),
    },
    {
      source: '/(.*)',
      headers: [
        { key: 'Content-Security-Policy', value: cspHeader },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ],
};

export default nextConfig;
