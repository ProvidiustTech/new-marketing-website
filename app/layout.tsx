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
};

// Scales the fixed design canvas to the viewport before first paint.
const fitScript = `(function(){var d=document.documentElement;function f(){var w=d.clientWidth;d.style.setProperty('--z',w<768?w/390:Math.min(w/1440,1.4))}f();addEventListener('resize',f)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${jakarta.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: fitScript }} />
        <SmoothScroll>
          <div
            id="stage"
            className="mx-auto w-[1440px] overflow-x-clip max-md:w-[390px]"
          >
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
