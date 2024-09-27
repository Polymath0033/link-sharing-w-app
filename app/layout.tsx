import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ToastProvider } from "@/components/molecules/toast-provider";
import "./globals.css";
import { BodyWrapper } from "@/components/atoms/body-wrapper";
const instrumentalSans = Instrument_Sans({ subsets: ["latin"] });

import LayoutWrapper from "@/components/atoms/layout-wrapper";
export const metadata: Metadata = {
  title: "Devs Links Sharing App",
  description: "A simple app to share links with other developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutWrapper>
      <html lang="en">
        <body className={`${instrumentalSans.className}   bg-light-grey`}>
          <BodyWrapper />
          <ToastProvider>{children}</ToastProvider>
        </body>
      </html>
    </LayoutWrapper>
  );
}
