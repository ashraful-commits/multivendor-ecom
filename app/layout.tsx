import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './../components/backend/ThemProvider';
import toast, { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import AuthProvider from './../components/backend/Provider';
import Navbar from './../components/frontend/Navbar';
import ProviderCom from '../components/ProviderCom';

export const metadata: Metadata = {
  title: 'Multi vendor',
  description: 'Start your journey of shopping!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-900">
        <ProviderCom>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
           <NextSSRPlugin
       
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
   
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />

           <AuthProvider>
            {children}
            </AuthProvider>
        </ThemeProvider>
        </ProviderCom>
        
      </body>
    </html>
  );
}
