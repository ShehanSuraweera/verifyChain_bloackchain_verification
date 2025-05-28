import "@/styles/globals.css";
import "@meshsdk/react/styles.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/App.css";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </MeshProvider>
  );
}
