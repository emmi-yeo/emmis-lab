import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      {/* Global background + text colors; everything else should inherit */}
      <body className="bg-lightsecondary dark:bg-darksecondary text-lighttextprimary dark:text-darktextprimary transition-colors duration-300 font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
