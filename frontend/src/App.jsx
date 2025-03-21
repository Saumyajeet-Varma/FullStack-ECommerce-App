import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Categories from "./pages/Categories.jsx";
import Cart from "./pages/Cart.jsx";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Private from "./components/Routes/Private.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CreateCategory from "./pages/admin/CreateCategory.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import ProductPage from "./pages/admin/ProductPage.jsx";
import Products from "./pages/admin/Products.jsx";
import Users from "./pages/admin/Users.jsx";
import Profile from "./pages/user/Profile.jsx";
import Orders from "./pages/user/Orders.jsx";
import OrderPage from "./pages/user/OrderPage.jsx";
import Search from "./pages/Search.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Category from "./pages/Category.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />

      <Route path="/search" element={<Search />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories/:slug" element={<Category />} />

      <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/update-profile" element={<Profile />} />
        <Route path="user/change-password" element={<ChangePassword />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/order/:orderId" element={<OrderPage />} />
      </Route>

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/createCategory" element={<CreateCategory />} />
        <Route path="admin/createProduct" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<ProductPage />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<Users />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
