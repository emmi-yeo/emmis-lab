import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import CustomCursor from '@/components/CustomCursor';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CustomCursor />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
