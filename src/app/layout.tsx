import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
