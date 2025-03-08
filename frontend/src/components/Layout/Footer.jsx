const navigationItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Policy", href: "/policy" },
];

function Footer() {
    return (
        <footer className="bg-gray-800 text-white pt-5 pb-3">
            <div className="text-center mb-4">
                <p className="text-gray-300">All rights reserved &copy; <span className="text-white font-bold">SV</span></p>
            </div>
            <hr className="w-3/4 m-auto border-gray-300" />
            <div className="flex flex-wrap justify-center space-x-16 mt-3">
                {navigationItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </footer>
    );
}

export default Footer;
