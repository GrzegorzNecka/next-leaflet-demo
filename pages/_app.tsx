import { Layout } from '@/components/layout/layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PointerStateContextProvider } from '@/context/_pointer-context';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <PointerStateContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PointerStateContextProvider>
            </QueryClientProvider>
        </>
    );
}
