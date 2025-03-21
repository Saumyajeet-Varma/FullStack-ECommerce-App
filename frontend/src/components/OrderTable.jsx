/* eslint-disable react/prop-types */
import moment from 'moment'

const OrderTable = ({ orders }) => {
    return (
        <div className="container">
            <div className="overflow-x-auto w-full">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">#</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Status</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Buyer</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Orders</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Payment</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Quantity</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr key={order?._id} className="border-b">
                                <td className="py-3 px-6">{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                                <td className="py-3 px-6">{order?.status}</td>
                                <td className="py-3 px-6">{order?.buyer?.name}</td>
                                <td className="py-3 px-6">{moment(order?.createdAt).fromNow()}</td>
                                <td className="py-3 px-6">{order?.payment.success ? "Success" : "Failed"}</td>
                                <td className="py-3 px-6">{order?.products?.length}</td>
                                <td className="py-3 px-6">
                                    <a href={`/dashboard/user/order/${order._id}`} className='text-gray-600 underline font-semibold'>Click</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
