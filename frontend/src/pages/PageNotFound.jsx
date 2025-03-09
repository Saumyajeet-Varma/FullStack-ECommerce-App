import { Helmet } from "react-helmet"

export default function PageNotFound() {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <Helmet>
                    <meta charSet="utf-8" />
                    <div>
                        <meta name="description" content="Error page in MERN project" />
                        <meta name="keywords" content="Error 404" />
                        <meta name="author" content="Saumyajeet Varma" />
                    </div>
                    <title>404 - Page not found</title>
                    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
                </Helmet>
                <div className="text-center">
                    <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-700 sm:text-7xl">
                        404
                    </h2>
                    <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-gray-700 sm:text-6xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/"
                            className="flex gap-3 bg-gray-200 rounded-md  px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                            Go back home
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}
