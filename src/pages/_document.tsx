import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />

        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="VerifyChain - Blockchain-powered document verification system"
        />
        <meta
          name="keywords"
          content="blockchain, verification, document, cardano, mesh"
        />
        <meta name="author" content="Your Name" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://verifychain.vercel.app" />
        <meta
          property="og:title"
          content="VerifyChain | Secure Document Verification"
        />
        <meta
          property="og:description"
          content="Tamper-proof document authentication powered by Cardano blockchain"
        />
        <meta
          property="og:image"
          content="https://verifychain.vercel.app/og-image.jpg"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://verifychain.vercel.app/" />
        <meta
          name="twitter:title"
          content="VerifyChain | Secure Document Verification"
        />
        <meta
          name="twitter:description"
          content="Tamper-proof document authentication powered by Cardano blockchain"
        />
        <meta
          name="twitter:image"
          content="https://verifychain.vercel.app/twitter-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://verifychain.vercel.app/" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
