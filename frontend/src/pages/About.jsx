import Layout from "../components/Layout/Layout"

function About() {
    return (
        <>
            <Layout title={"About us - Ecommerce"}>
                <div className="relative isolate overflow-hidden bg-gray-900 min-h-[73.5vh] py-16">

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="max-w-xl mb-20 lg:max-w-full">
                            <h2 className="text-5xl font-semibold tracking-tight text-white">About</h2>
                            <p className="mt-4 text-lg text-gray-300">
                                Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
                                dolore.
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-full gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1">
                            <p className="text-gray-400 text-lg">
                                At [Your Store Name], we are passionate about bringing you the best shopping experience. Our journey started with a vision to provide high-quality products at competitive prices, ensuring customer satisfaction at every step.
                                <br />
                                We take pride in our wide range of products, carefully selected to meet diverse needs and preferences. Whether you&apos;re looking for the latest trends, essential goods, or exclusive deals, we have something for everyone.
                                <br />
                                Our commitment to quality sets us apart. Every product undergoes strict quality checks to ensure it meets our high standards, so you receive only the best.
                                <br />
                                We believe in seamless shopping with secure payments, fast shipping, and hassle-free returns. Our user-friendly website makes browsing, purchasing, and tracking orders easy and convenient.
                                <br />
                                At the heart of our business is customer satisfaction. Our dedicated support team is always ready to assist you, ensuring a smooth and enjoyable shopping experience.
                                <br />
                                Sustainability matters to us. We strive to implement eco-friendly practices by promoting sustainable packaging and ethical sourcing, making a positive impact on the environment.
                                <br />
                                We are more than just an e-commerce platform; we are a community. Join us and experience a new way of shopping, where quality, convenience, and customer care come together.
                            </p>
                        </div>
                    </div>
                    <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                        />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default About
