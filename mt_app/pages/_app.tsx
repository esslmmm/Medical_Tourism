import type { AppProps } from "next/app";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Put your global layout here, e.g. navbar, footer */}
        <main className="max-w-4xl mx-auto p-4">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}