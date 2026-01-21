// src/types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // Next.js built-in vars
    readonly NODE_ENV: 'development' | 'production' | 'test';
    
    // Your custom env vars
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_APP_URL: string;
  }
}

// This makes TypeScript recognize process.env in browser context
interface ImportMeta {
  readonly env: {
    readonly NEXT_PUBLIC_API_URL: string;
    // Add other env vars you use
  };
}