import './globals.css';

export const metadata = {
  title: 'BandhanConnect — Find Your Soulmate',
  description: 'India\'s free matrimonial platform. Create your profile, discover compatible matches by religion, caste, education, and more.',
  keywords: 'matrimonial, shaadi, marriage, Hindu, Muslim, Sikh, Christian, Brahmin, matchmaking',
  openGraph: {
    title: 'BandhanConnect — Find Your Soulmate',
    description: 'Free matrimonial platform with smart compatibility matching.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
