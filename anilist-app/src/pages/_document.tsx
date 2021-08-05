import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link href="/fonts/style.css" rel="stylesheet" />
        </Head>
        <body
          style={{
            fontFamily: "Helvetica Regular",
            fontWeight: 400,
            fontSize: "20px",
            backgroundColor: "#f8f8f8",
            color: "#2C2C2C",
          }}
        >
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
