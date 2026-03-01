import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// const sourceSerif = Source_Serif_4({
//   subsets: ["latin"],
//   variable: "--font-source-serif",
//   weight: ["400", "500", "600", "700"],
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const SITE_NAME = "SUST EEE Student Portal";
const SITE_DESCRIPTION =
  "Official academic management portal for the Department of Electrical and Electronic Engineering (EEE), Shahjalal University of Science and Technology (SUST), Sylhet, Bangladesh. Access courses, attendance, enrollment, grades, and academic records.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "SUST",
    "EEE",
    "Shahjalal University",
    "student portal",
    "academic portal",
    "EEE department",
    "course management",
    "attendance tracking",
    "enrollment system",
    "SUST Sylhet",
    "electrical engineering",
    "electronic engineering",
    "Bangladesh university",
    "academic records",
    "student dashboard",
  ],
  authors: [
    {
      name: "Department of EEE, SUST",
      url: SITE_URL,
    },
  ],
  creator: "Department of EEE, SUST",
  publisher: "Shahjalal University of Science and Technology",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200, // optional but recommended
        height: 630,
        alt: "EEE Department Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Education",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { SITE_URL } from "@/lib/env";
import { Toaster } from "sonner";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Department of Electrical and Electronic Engineering, SUST",
  alternateName: "SUST EEE",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Official academic management portal for the Department of Electrical and Electronic Engineering (EEE), Shahjalal University of Science and Technology (SUST), Sylhet, Bangladesh.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shahjalal University of Science and Technology",
    addressLocality: "Sylhet",
    addressCountry: "BD",
  },
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Shahjalal University of Science and Technology",
    alternateName: "SUST",
    url: "https://www.sust.edu",
  },
  sameAs: [],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-serif antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster
          closeButton
          toastOptions={{
            classNames: {
              error: "bg-red-500/80! text-white! border-red-600!",
              success: "bg-green-500! text-white! border-green-600!",
            },
          }}
        />
      </body>
    </html>
  );
}
