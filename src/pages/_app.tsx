
import '@/styles/globals.css';
import { Toaster } from 'sonner';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </main>
    </AuthProvider>
  );
}
