import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Native Server UI | Control Your App",
  description: "The easiest way to add server side functionality to your static app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://React Native Server UI.com",
    siteName: "React Native Server UI",
    title: "React Native Server UI | Control Your App",
    description: "The easiest way to add server side functionality to your static app",
    images: [
      {
        url: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=stock%20market%20candlestick%20chart%20dark%20mode%20dashboard%20modern%20ui&image_size=landscape_16_9",
        width: 1200,
        height: 630,
        alt: "React Native Server UI Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Native Server UI | Control Your App",
    description: "The easiest way to add server side functionality to your static app",
    images: ["https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=stock%20market%20candlestick%20chart%20dark%20mode%20dashboard%20modern%20ui&image_size=landscape_16_9"],
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-slate-900">
      <Navbar />
      <main className="h-full ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
