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

const authLink = setContext((_, { JSON }) => {
  // get the authentication token from local storage if it exists
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  // return the JSON obj to the context so httpLink can read them
  return token
    ? {
        JSON: {
          ...JSON,
        },
      }
    : {
        JSON: {
          ...JSON,
          grant_type: "authorization_code",
          client_id: "5578",
          client_secret: "4GGszEszd5xoBTW4wLIzH8QL1PL5mOMa6b3CxLl1",
          redirect_uri: "http://localhost:3000/",
          code: `${token}`,
        },
      };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Page: {
    //     keyFields: ["pageInfo", ["perPage", "currentPage"]],
    //     merge(existing, incomming, { mergeObjects, args }) {
    //       console.log(args);
    //       return mergeObjects(existing, incomming);
    //     },
    //     fields: {
    //       media: {
    //         keyArgs: ["season", "page", "type", "perPage"],
    //         merge(existing = [], incomming) {
    //           return [...existing, ...incomming];
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = new URL(`https://1.com/?${router.asPath.slice(2)}`); //fake url to make acess token
  const token = url.searchParams.get("code"); // get JWT token from url if exists
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER && token) {
    localStorage.setItem("token", token);
    router.replace("/", undefined, { shallow: true }); // delete query params if redirect happened without page reloadig
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
