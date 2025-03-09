/* eslint-disable */
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

import Footer from "./Footer";
import Header from "./Header";

function Layout({ children, title, description, keywords, author }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Helmet>
                <meta charSet="utf-8" />
                <div>
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                </div>
                <title>{title}</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>

            <Header />
            <main role="main" className="flex-grow">
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "Ecommerce app",
    description: "Mern stack project",
    keywords: "MERN MongoDB Express React Node",
    author: "Saumyajeet Varma"
}

export default Layout;
