import toast from "react-hot-toast";
import chalk from "chalk";

import Layout from "../components/Layout/Layout.jsx";
import CartTable from "../components/CartTable.jsx"
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";

const Cart = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();

    const totalPrice = () => {

        try {
            const total = cart.reduce((acc, val) => acc += val.price, 0)
            return total
        }
        catch (error) {
            console.log(chalk.red(error))
            toast.error("Failed in calculating the total")
        }
    }

    const handleRemove = (id) => {

        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === id)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
            toast.success("Item removed from cart");
        }
        catch (error) {
            console.log(chalk.red(error))
            toast.error("Failed to remove item from cart")
        }
    }

    const handleCheckout = () => {

        try {
            const myCart = []
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
            toast.success("Checked out sucessfully");
        }
        catch (error) {
            console.log(chalk.red(error))
            toast.error("Failed to checkout")
        }
    }

    return (
        <Layout>
            <div className="px-20 py-10">
                <div>
                    <h1 className="text-2xl font-semibold">{`Hello ${auth?.user?.name || "Guest"}`}</h1>
                    <h4 className="font-normal text-xl text-gray-500">{`You have ${cart?.length || 0} item(s) in your cart`}</h4>
                    {!auth?.token && <h4 className="text-red-600">Please <a href="/login" className="font-bold">login</a> to checkout</h4>}
                </div>
                <div className="flex my-4 gap-6">
                    <div className="w-2/3">
                        <CartTable products={cart} handleRemove={handleRemove} />
                    </div>
                    <div className="w-1/3">
                        <h1 className="text-3xl text-center font-semibold mb-2">Cart summary</h1>
                        <hr />
                        <div className="mt-5 text-lg flex items-center justify-center">
                            <div>
                                <h4>Total: <span className="font-semibold text-xl">${totalPrice()}</span></h4>
                                {auth?.user?.address ? (
                                    <>
                                        <h4>Delivery address: <span className="font-semibold text-xl">{auth.user.address}</span></h4>
                                    </>
                                ) : (
                                    <>
                                        <h6 className="text-red-600">You need to <a href="/login" className="font-bold">login</a></h6>
                                    </>
                                )}
                                {(auth?.user && cart.length) ? (
                                    <div className="mt-10">
                                        <button
                                            onClick={() => handleCheckout()}
                                            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                        >
                                            Checkout

                                        </button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Cart;
