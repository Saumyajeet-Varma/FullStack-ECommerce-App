/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd';

const { Option } = Select

const OrderTable = ({ orders, admin, status }) => {

    const handleChange = async (value, orderId) => {

        try {
            const { data } = await axios.put(`/api/v1/auth/change-order-status/${orderId}`, { status: value })

            if (data.success) {
                toast.success("Status changed successfully")
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Error in changing the status")
        }
    }

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
                                <td className="py-3 px-6">{admin ? (
                                    <Select bordered={false} onChange={(val) => handleChange(val, order._id)} defaultValue={order?.status}>
                                        {status.map((item, index) => (
                                            <Option key={index} value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                ) : order?.status}</td>
                                <td className="py-3 px-6">{order?.buyer?.name}</td>
                                <td className="py-3 px-6">{moment(order?.createdAt).fromNow()}</td>
                                <td className="py-3 px-6">{order?.payment.success ? "Success" : "Failed"}</td>
                                <td className="py-3 px-6">{order?.products?.length}</td>
                                <td className="py-3 px-6">
                                    <a href={admin ? `/dashboard/admin/order/${order._id}` : `/dashboard/user/order/${order._id}`} className='text-gray-600 underline font-semibold'>Click</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default OrderTable;
