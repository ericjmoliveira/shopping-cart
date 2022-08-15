import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "../pages/home";
import Product from "../pages/product";
import Cart from "../pages/cart";
import Search from "../pages/search";
import Lists from "../pages/lists";

const ScrollHandler = ({ children }: { children: JSX.Element }) => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

const AppRoutes = () => {
    return (
        <ScrollHandler>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/product/:id/:slug" element={<Product />}></Route>
                <Route path="/search/:query" element={<Search />}></Route>
                <Route path="/lists" element={<Lists />}></Route>
            </Routes>
        </ScrollHandler>
    );
};

export default AppRoutes;
