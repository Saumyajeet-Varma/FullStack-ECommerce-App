import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import { useAuth } from "../../context/AuthProvider"

function Profile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const { name, email, phone, address } = auth.user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [auth.user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.put(`/api/v1/auth/update-profile`, { name, email, phone, address })

            if (data.success) {
                setAuth({ ...auth, user: data.user })

                let ls = localStorage.getItem("user")
                ls = JSON.parse(ls)
                ls.user = data.user
                localStorage.setItem("auth", JSON.stringify(ls))

                toast.success("profile updated successfully")
            }
            else {
                toast.error("Failed to update profile")
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Something went wrong !")
        }
    }

    return (
        <>
            <Layout title={"User - Profile"}>
                <div className="flex">
                    <UserMenu />
                    <div className='mx-auto w-full md:w-3/4 lg:w-1/2 p-16'>
                        <h1 className='mb-10 text-3xl font-bold'>Update profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                                        <div className="col-span-full">
                                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                                Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="text"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                                Address
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="address"
                                                    name="address"
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Update profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Profile
