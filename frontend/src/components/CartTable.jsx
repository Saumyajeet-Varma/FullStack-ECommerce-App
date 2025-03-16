/* eslint-disable react/prop-types */
const CartTable = ({ products, handleRemove }) => {
    return (
        <div className="container">
            <div className="overflow-x-auto w-full">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Product Image</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Product Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product._id} className="border-b">
                                <td className="py-3 px-6">
                                    <img
                                        src={`/api/v1/product/get-product-image/${product._id}`}
                                        alt={product.name}
                                        className="h-24 w-24 aspect-square object-cover rounded-md"
                                    />
                                </td>
                                <td className="py-3 px-6">
                                    <p className="text-xl font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {product.description.length > 30 ? `${product.description.substring(0, 30)}...` : product.description}
                                    </p>
                                    <p className="mt-2 text-md font-medium">${product.price}</p>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                        aria-label={`Remove ${product.name} from cart`}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartTable;
