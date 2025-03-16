import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../context/AuthProvider";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Category", href: "/category" },
    { name: "Cart", href: "/cart" },
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
];

const authNavigationItems = [
    { name: "Home", href: "/" },
    { name: "Category", href: "/category" },
    { name: "Cart", href: "/cart" },
];

export default function Header() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const [auth, setAuth] = useAuth()

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "" })
        localStorage.removeItem('auth')
        toast.success("Logged out successfully")
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab); // Store the active tab in localStorage
    }, [activeTab]);

    return (
        <Disclosure as="nav" className="bg-gray-800 drop-shadow-lg sticky top-0 z-10">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <a href="/">
                            <div className="flex shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://img.icons8.com/?size=100&id=LhRbsuC35iCh&format=png&color=FFFFFF"
                                    className="h-10 w-auto"
                                />
                                <p className="text-white text-2xl ml-5">E-Commerce</p>
                            </div>
                        </a>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-2">
                                {!auth.user ? navigationItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setActiveTab(item.href)}
                                        className={classNames(
                                            activeTab === item.href
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )) : authNavigationItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setActiveTab(item.href)}
                                        className={classNames(
                                            activeTab === item.href
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {auth.user && <Menu as="div" className="relative ml-5">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="size-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition">
                                <MenuItem>
                                    {({ active }) => (
                                        <a
                                            href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Dashboard
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Settings
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <a
                                            href="/login"
                                            onClick={handleLogout}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Logout
                                        </a>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Menu>}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigationItems.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            onClick={() => setActiveTab(item.href)}
                            className={classNames(
                                activeTab === item.href
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
} 