/* eslint-disable */
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main role="main" className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
