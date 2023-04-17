import { Html, Head, Main, NextScript } from 'next/document'
/* Custom Document
  - Override's the default Document
  - This file is only rendered on the server
  - Can update the <html> and <body> tags used to render a Page

  see:  https://nextjs.org/docs/advanced-features/custom-document
*/

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
