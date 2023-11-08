import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#2296f3" />
        <meta name="title" content="Clo4" />
        <meta name="description" content="Automated Ratio Trader" />
        <meta name="keywords" content="Clo, Trader" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <meta property="og:title" content="Clo4" />
        <meta property="og:description" content="Automated Ratio Trader" />
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/1171379934355267604/1171906740032372786/logo.png" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap&family=Public+Sans:wght@400;500;600;700"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
