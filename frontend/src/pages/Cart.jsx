import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

import Layout from "../components/Layout/Layout.jsx";
import ProductTable from "../components/ProductTable.jsx";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";

const Cart = () => {

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);

    const [auth] = useAuth();
    const [cart, setCart] = useCart();

    const navigate = useNavigate();

    const totalPrice = () => {

        try {
            const total = cart.reduce((acc, val) => (acc += val.price), 0);
            return total;
        }
        catch (error) {
            console.log(error);
            toast.error("Failed in calculating the total");
        }
    };

    const handleRemove = (id) => {

        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === id);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
            toast.success("Item removed from cart");
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to remove item from cart");
        }
    };

    const handlePayment = async () => {

        try {
            setPaymentLoading(true);

            const { nonce } = await instance.requestPaymentMethod();

            if (!nonce) {
                throw new Error("Failed to get payment nonce");
            }

            const { data } = await axios.post("/api/v1/order/braintree/payment", {
                cart,
                nonce,
            });

            if (data.success) {
                console.log("check");
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
                toast.success("Payment completed successfully");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Error in payment");
        }
        finally {
            setPaymentLoading(false);
        }
    };

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/order/braintree/token");

            if (data.success) {
                setClientToken(data.token);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to get client token");
        }
    };

    useEffect(() => {
        getClientToken();
    }, [auth?.token]);

    return (
        <Layout title={"Cartify - Cart"}>
            <div className="px-20 py-10">
                <div>
                    <h1 className="text-2xl font-semibold">{`Hello ${auth?.user?.name || "Guest"
                        }`}</h1>
                    <h4 className="font-normal text-xl text-gray-500">{`You have ${cart?.length || 0
                        } item(s) in your cart`}</h4>
                    {!auth?.token && (
                        <h4 className="text-red-600">
                            Please{" "}
                            <a href="/login" className="font-bold">
                                login
                            </a>{" "}
                            to checkout
                        </h4>
                    )}
                </div>
                <div className="flex my-4 gap-6">
                    <div className="w-2/3">
                        <ProductTable products={cart} purpose="cart" handleRemove={handleRemove} />
                    </div>
                    <div className="w-1/3">
                        <h1 className="text-3xl text-center font-semibold mb-2">
                            Cart summary
                        </h1>
                        <hr />
                        <div className="mt-5 text-lg flex items-center justify-center">
                            <div className="w-full">
                                <h4>
                                    Total:{" "}
                                    <span className="font-semibold text-xl">${totalPrice()}</span>
                                </h4>
                                {auth?.user?.address ? (
                                    <>
                                        <h4>
                                            Delivery address:{" "}
                                            <span className="font-semibold text-xl">
                                                {auth.user.address}
                                            </span>
                                        </h4>
                                    </>
                                ) : (
                                    <>
                                        <h6 className="text-red-600">
                                            You need to{" "}
                                            <a href="/login" className="font-bold">
                                                login
                                            </a>
                                        </h6>
                                    </>
                                )}
                                <div className="mt-5">
                                    {!clientToken || !cart?.length ? (
                                        <></>
                                    ) : (
                                        <>
                                            <DropIn
                                                options={{
                                                    authorization: clientToken,
                                                    paypal: {
                                                        flow: "vault",
                                                    },
                                                }}
                                                onInstance={(instance) => setInstance(instance)}
                                            />

                                            <button
                                                onClick={handlePayment}
                                                className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                                disabled={
                                                    paymentLoading || !instance || !auth?.user?.address
                                                }
                                            >
                                                {paymentLoading ? "Processing ...." : "Make Payment"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;