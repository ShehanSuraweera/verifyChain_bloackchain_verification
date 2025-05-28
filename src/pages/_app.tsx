import "@/styles/globals.css";
import "@meshsdk/react/styles.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/App.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Component {...pageProps} />
      <Toaster />
    </MeshProvider>
  );
}
