import Private from "../Components/Private/Private";

import Login from "../Pages/Auth/Login/Login";

import ProductDetail from "../Pages/Client/ProductDetail/ProductDetail"
import CategoryInfo from "../Pages/Client/Category/CategoryInfo";
import NotFound from "../Pages/Client/NotFound/NotFound"
import AboutUs from "../Pages/Client/AboutUs/AboutUs";
import Cart from "../Pages/Client/Cart/Cart";
import Index from "../Pages/Client/Index";

// import Articles from "../Pages/Admin-panel/Articles/Articles";
// import ArticlesClient from "../Pages/Client/Articles/ArticlesClient";
// import ArticlesInfo from "../Pages/Client/Articles/ArticlesInfo";

import AdminPanel from "../Pages/Admin-panel/AdminPanel";
import DashBoard from "../Pages/Admin-panel/Dashboard/Dashboard";
import Products from "../Pages/Admin-panel/Products/Products";
import Categories from "../Pages/Admin-panel/Categories/Categories";
import Users from "../Pages/Admin-panel/Users/Users";
import Campaign from "../Pages/Admin-panel/Campaign/Campaign";

const routes = [
    { path: "/", element: <Index /> },
    { path: "/login", element: <Login /> },
    { path: "/category/:categoryName", element: <CategoryInfo /> },
    { path: "/products/:shortName", element: <ProductDetail /> },
    { path: "/cart", element: <Cart /> },
    { path: "/about-us", element: <AboutUs /> },
    // { path: "/articles/:articleName", element: <ArticlesInfo /> },
    // { path: "/articles", element: <ArticlesClient /> },
    { path: "*", element: <NotFound /> },
    {
        path: "/p-admin/*",
        element: <Private>
                    <AdminPanel />
                </Private>,
        children: [
            { path: "dashboard", element: <DashBoard /> },
            { path: "products", element: <Products /> },
            { path: "categories", element: <Categories /> },
            { path: "users", element: <Users /> },
            { path: "campaign", element: <Campaign /> },
            // { path: "articles", element: <Articles /> },
        ]
    },
]

export default routes;