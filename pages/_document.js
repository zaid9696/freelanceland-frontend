
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
    
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name="theme-color" content="#634CC2" />
           <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <script src={`https://www.paypal.com/sdk/js?client-id=AStWyarG84TtXbtG2cfj7j2EzPzOlaJUC2dIqPukkzPwoiiEbqcLCUs4D_wmyggIEZVaqxW8mMFl1Ro8`}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
 
}
         