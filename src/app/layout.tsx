import type { Metadata } from "next";
import { IBM_Plex_Mono, Lato } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Luong Hieu Trinh | Mechatronics Engineering Portfolio",
    template: "%s | Luong Hieu Trinh",
  },
  description:
    "The engineering projects, experience, and technical work of RMIT mechatronics student Luong Hieu Trinh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
