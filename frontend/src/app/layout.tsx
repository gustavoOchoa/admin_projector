import './globals.css';
import "primereact/resources/primereact.min.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import Template from '@/app/components/template/template';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();
  if(router.pathname === '/'){
    return (
      <html lang="en" className="h-full">
        <body className="h-full">{children}</body>
      </html>
    );
  }
  else{
    return (
      <>
        <Template>
          {children}
        </Template>
      </>
    );
  }
}
