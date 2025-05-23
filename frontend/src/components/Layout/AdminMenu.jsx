import { useLocation } from "react-router-dom";

const AdminMenu = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-[73.4vh] w-1/5 p-3 bg-gray-100 text-gray-800 border-y-1 drop-shadow-3xl">
            <ul className="space-y-2">
                <a
                    href="/dashboard/admin/createCategory"
                    className={`text-md flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-gray-200 ${isActive("/dashboard/admin/createCategory") ? "bg-gray-200 text-gray-800" : ""
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                    <p>Create Category</p>
                </a>
                <hr className="border-gray-300" />

                <a
                    href="/dashboard/admin/createProduct"
                    className={`text-md flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-gray-200 ${isActive("/dashboard/admin/createProduct") ? "bg-gray-200 text-gray-800" : ""
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <p>Create Product</p>
                </a>
                <hr className="border-gray-300" />

                <a
                    href="/dashboard/admin/products"
                    className={`text-md flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-gray-200 ${isActive("/dashboard/admin/products") ? "bg-gray-200 text-gray-800" : ""
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <p>Products</p>
                </a>
                <hr className="border-gray-300" />

                <a
                    href="/dashboard/admin/orders"
                    className={`text-md flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-gray-200 ${isActive("/dashboard/admin/orders") ? "bg-gray-200 text-gray-800" : ""
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <p>Orders</p>
                </a>
            </ul>
        </div>
    );
};

export default AdminMenu;
