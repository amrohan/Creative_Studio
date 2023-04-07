import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Creative Studio Collection."
          />
          <meta property="og:site_name" content="https://creative-studio2712.netlify.app/" />
          <meta
            property="og:description"
            content="Creative Studio Collection."
          />
          <meta property="og:title" content="Creative Studio" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Creative Studio Collection." />
          <meta
            name="twitter:description"
            content="Creative Studio Collection"
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
