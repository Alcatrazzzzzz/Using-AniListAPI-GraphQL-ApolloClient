import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import React from "react";
import theme from "../theme";
import "../css/global.css";

const httpLink = createHttpLink({
  uri: "https://graphql.anilist.co",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  // return the headers to the context so httpLink can read them
  return token
    ? {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }
    : {
        headers: {
          ...headers,
        },
      };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = new URL(`https://1.com/?${router.asPath.slice(2)}`); //fake url to make acess token
  const token = url.searchParams.get("access_token"); // get JWT token from url if exists
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER && token) {
    localStorage.setItem("token", token);
  }

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
