import { useLocation } from "react-router-dom";

const UserMenu = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-[73.4vh] w-1/5 p-3 bg-gray-100 text-gray-800 border-y-1 drop-shadow-3xl">
            <ul className="space-y-2">
                <a
                    href="/dashboard/user/profile"
                    className={`text-md flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-gray-200 ${isActive("/dashboard/admin/createCategory") ? "bg-gray-200 text-gray-800" : ""
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p>Profile</p>
                </a>
                <hr className="border-gray-300" />

                <a
                    href="/dashboard/user/orders"
                    className={`text-md flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-gray-200 ${isActive("/dashboard/admin/createProduct") ? "bg-gray-200 text-gray-800" : ""
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                    </svg>
                    <p>Orders</p>
                </a>
            </ul>
        </div>
    );
};

export default UserMenu;
