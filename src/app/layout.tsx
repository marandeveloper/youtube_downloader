import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TubeGrab",
  description:
    "TubeGrab is your premier destination for effortlessly downloading YouTube videos. With our intuitive interface and lightning-fast speeds, you can easily save your favorite videos for offline viewing. Enjoy seamless access to your preferred content anytime, anywhere. Join thousands of satisfied users and experience the convenience of TubeGrab today!",
  icons: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
