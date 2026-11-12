import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Inter, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProvidiusTech | New Frontiers In Customer Support",
  description:
    "Grow your business without growing support. AI agents, channels, and infrastructure that scales with you.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b5fd0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${jakarta.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll>
          <div className="w-full overflow-x-clip">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
