import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";
import SonnerProvider from "./providers/SonnerProvider";
import SocketProvider from "./providers/SocketProvider";
import URLRefresher from "./providers/URLRefresher";

export const metadata: Metadata = {
  title: "QuickCart - Your Express Online Shopping Destination",
  description: "Skip the wait and find what you need instantly. QuickCart offers a seamless shopping experience with lightning-fast delivery and top-quality products.",
};

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${outfit.className}`}>
        <ReduxProvider>
          <SonnerProvider>
            <SocketProvider>
              <URLRefresher>
                {children}
              </URLRefresher>
            </SocketProvider>
          </SonnerProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
