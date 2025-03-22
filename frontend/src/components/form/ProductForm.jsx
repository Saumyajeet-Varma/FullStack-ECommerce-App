/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Select } from "antd"
import { PhotoIcon } from '@heroicons/react/24/solid'

const { Option } = Select

function ProductForm({ update = false, submitText, handleSubmit, handleDelete, categories, name, description, category, price, quantity, image, shipping, setName, setDescription, setCategory, setPrice, setQuantity, setImage, setShipping, id }) {

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-10 space-y-6">
                <div className="pb-3">
                    <label className="block text-sm/6 font-medium text-gray-900">
                        Category of product
                    </label>
                    <Select
                        placeholder="Select Category"
                        size="large"
                        onChange={(value) => setCategory(value)}
                        showSearch
                        className="mt-2 w-full"
                        name="category"
                        value={category || undefined}
                    >
                        {categories.map(categoryOption => (
                            <Option key={categoryOption._id} value={categoryOption._id}>
                                {categoryOption.name}
                            </Option>
                        ))}
                    </Select>
                    <div className="mt-8">
                        <div className="col-span-full">
                            <label className="block text-sm/6 font-medium text-gray-900">
                                Product image
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    {update ? (image ? <img src={URL.createObjectURL(image)} alt="Product image" className="mx-auto h-24 text-gray-300" /> : <img src={`/api/v1/product/get-product-image/${id}`} alt="Product image" className="mx-auto h-24" />) :
                                        (image ? <img src={URL.createObjectURL(image)} alt="Product image" className="mx-auto h-24 text-gray-300" /> : <PhotoIcon aria-hidden="true" className="mx-auto size-24 text-gray-300" />)}
                                    <div className="mt-4 flex items-center justify-center text-sm/6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 hover:text-gray-500"
                                        >
                                            <span>{image ? image.name : "Upload a file"}</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setImage(e.target.files[0])} />
                                        </label>
                                    </div>
                                    {!image && <p className="text-xs/5 text-gray-600">PNG, JPG up to 1MB</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="space-y-6">
                            <div className="pb-6">
                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                            Product name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                            Product description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                            Product price
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="price"
                                                name="price"
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <label htmlFor="quantity" className="block text-sm/6 font-medium text-gray-900">
                                            Product quantity
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className="block text-sm/6 font-medium text-gray-900">
                        Shipping
                    </label>
                    <Select
                        placeholder="Select Shipping"
                        size="large"
                        onChange={(value) => setShipping(value)}
                        showSearch
                        className="mt-2 w-full"
                        name="shipping"
                    >
                        <Option value={"1"}>Yes</Option>
                        <Option value={"0"}>No</Option>
                    </Select>
                </div>

                <div className="flex items-center justify-end gap-x-2">
                    <button
                        type="submit"
                        className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                        {submitText}
                    </button>
                    {update && <button
                        onClick={handleDelete}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete product
                    </button>}
                </div>
            </div>
        </form>
    )
}

export default ProductForm
