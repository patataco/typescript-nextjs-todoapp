import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex h-screen flex-col bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
