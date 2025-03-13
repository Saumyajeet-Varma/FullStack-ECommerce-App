/* eslint-disable react/prop-types */
export default function CategoryForm({ value, setValue, handleSubmit, submitText }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div className="pb-6">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Category name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    {submitText}
                </button>
            </div>
        </form>
    )
}
