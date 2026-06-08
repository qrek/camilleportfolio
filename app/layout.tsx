import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// Police de repli libre — la pile (tailwind.config) place "Neue Haas Grotesk
// Display Pro" en premier ; Inter prend le relais si elle n'est pas installée.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Substitut libre d'« Exposure Italic » : serif fine et contrastée.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Camille Ameline de Cadeville — Directrice artistique & motion designer",
  description:
    "Directrice artistique et motion designer, basée à Paris, spécialisée dans le développement d'identités de marque et la création de contenus visuels et digitaux.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('cam_loaded')==='1'){document.documentElement.classList.add('cam-skip-loader','intro-ready')}}catch(e){}",
          }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
