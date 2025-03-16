import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import chalk from "chalk"

import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`/api/v1/auth/change-password`, { currentPassword, newPassword })

            if (response.data.success) {
                toast.success("password changed successfully")
                navigate("/dashboard/user")
            }
        }
        catch (error) {
            console.log(chalk.red(`Error: ${error.message}`))
            toast.error("Something went wrong !")
        }
    }

    return (
        <Layout title={"User - Profile"}>
            <div className="flex">
                <UserMenu />
                <div className='mx-auto w-full md:w-3/4 lg:w-1/2 p-16'>
                    <h1 className='mb-10 text-3xl font-bold'>Change password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                                    <div className="col-span-full">
                                        <label htmlFor="currentPassword" className="block text-sm/6 font-medium text-gray-900">
                                            Current Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="currentPassword"
                                                name="currentPassword"
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="newPassword" className="block text-sm/6 font-medium text-gray-900">
                                            New Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="newPassword"
                                                name="newPassword"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                required
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
                                Change password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ChangePassword
