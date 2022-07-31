import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Product from '../pages/Product/Product';
import Cart from '../pages/Cart/Cart';
import Search from '../pages/Search/Search';

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
            </Routes>
        </ScrollHandler>
    );
};

export default AppRoutes;
