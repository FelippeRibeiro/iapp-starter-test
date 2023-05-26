import { AuthProvider } from "@/context/Auth";
import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IAPP Chat App",
  description: "Chat App for IAPP test",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" data-theme="luxury">
      <body className={inter.className}>
        <AuthProvider>
          <Suspense fallback={<Loading />}>{children} </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
