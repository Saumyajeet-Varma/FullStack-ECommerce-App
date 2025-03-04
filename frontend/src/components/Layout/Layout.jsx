/* eslint-disable */
import Footer from "./Footer"
import Header from "./Header"

function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className="min-h-[80vh]">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
