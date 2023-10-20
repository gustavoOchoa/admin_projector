import './globals.css';
import "primereact/resources/primereact.min.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GM Brasil - DDP'
}

export default function RootLayout({ children,}: { children: React.ReactNode}) {

  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
