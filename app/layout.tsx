import type { Metadata } from "next";
import { Inter_Tight, Cormorant } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteContent } from "@/lib/content";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "latin-ext"],
});

// the serif is used exclusively as italic accent words — load just that face
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://caffevero.sk"),
  title: {
    default: "Caffè Vero — talianska káva a anglický čaj | Košice",
    template: "%s | Caffè Vero",
  },
  description:
    "Caffè Vero — distribútor talianskej kávy, kávovarov Fiorenzato a Faber, anglických čajov Ridgways, London a Heath & Heather, čokolády a sirupov Il Doge a Dreamy. Tatras Trade s.r.o., Košice.",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: "Caffè Vero",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Caffè Vero",
  legalName: siteContent.contact.company,
  url: "https://caffevero.sk",
  logo: "https://caffevero.sk/img/logo.png",
  email: siteContent.contact.email,
  telephone: siteContent.contact.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteContent.contact.street,
    addressLocality: "Košice",
    postalCode: "040 01",
    addressCountry: "SK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${interTight.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
