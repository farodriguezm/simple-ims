import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import client from "src/graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
