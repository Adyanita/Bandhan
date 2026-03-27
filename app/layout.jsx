import "./globals.css";

export const metadata = {
  title: "Sampark Sutra — Find Your Soulmate",
  description:
    "India's free matrimonial platform. Create your profile, discover compatible matches by religion, caste, education, and more.",
  keywords:
    "matrimonial, shaadi, marriage, Hindu, Muslim, Sikh, Christian, Brahmin, matchmaking",
  openGraph: {
    title: "Sampark Sutra — Find Your Soulmate",
    description: "Free matrimonial platform with smart compatibility matching.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
