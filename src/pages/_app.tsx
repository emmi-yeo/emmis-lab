import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CustomCursor />
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}
