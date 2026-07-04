import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-var",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Studio Chitkala — Where Thought Finds Form",
  description:
    "Branding, design, motion, and original art from Studio Chitkala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} min-h-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
