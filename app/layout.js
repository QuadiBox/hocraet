import { Urbanist } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import "./home.css";
import "./signup.css";
import "../icofont/icofont.min.css"

import { ClerkProvider } from "@clerk/nextjs";




const inter = Inter({subsets: ["latin"], weight: ['100', '300', '400', '500', '800', '700', '900'], variable: "--font-i"})
const urb = Urbanist({subsets: ["latin"], weight: ['100', '300', '400', '500', '800', '700'], variable: "--font-u"})



export const metadata = {
  title: 'Hocreate',
  description: "Welcome to DMayor Hocreate",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    title: 'DMayor Fitness & Game Hub',
    description: 'Discover DMayor Fitness & Game Hub, a unique blend of fitness and fun. Experience a community that welcomes everyone with open arms and endless activities.',
    images: [
      {
        url: "https://dmayorfitness.com/opengraph-image.png"
      }
    ]
  },
  twitter: {
    card: "summary_image_large",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    title: 'DMayor Fitness & Game Hub',
    description: 'Discover DMayor Fitness & Game Hub, a unique blend of fitness and fun. Experience a community that welcomes everyone with open arms and endless activities.',
    images: [
      {
        url: "https://dmayorfitness.com/opengraph-image.png"
      }
    ]
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${urb.variable} ${inter.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
