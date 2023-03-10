import Footer from 'components/layout/footer/footer';
import Header from 'components/layout/header/header';
import Head from 'next/head';
import Navigation from 'components/layout/header/navigation';
interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col mi-h-screen">
            <Head>
                <title>demo leaflet map</title>
                <meta name="description" content="demo leaflet map"></meta>
            </Head>

            {/* <Header>
                <Navigation />
            </Header> */}

            <div className="flex-grow">{children}</div>

            {/* <Footer /> */}
        </div>
    );
};
