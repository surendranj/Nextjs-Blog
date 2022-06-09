import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from "../src/components/Layout/Layout";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                    },
                },
            })
    );
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider theme={theme}>
                    <UserProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </UserProvider>
                </ThemeProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
