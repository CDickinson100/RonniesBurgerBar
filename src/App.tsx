import React, {useEffect, useState} from 'react';
import {Header} from "./components/header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Sidebar} from "./components/sidebar/Sidebar";
import {Login} from "./components/login/Login";
import {Register} from "./components/register/Register";
import {IUser} from "./IUser";
import {Menu} from "./components/menu/Menu";
import {IProduct} from "./IProduct";
import {Checkout} from "./components/checkout/Checkout";
import {Home} from "./components/home/Home";

export default function App() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const [shoppingCart, setShoppingCart] = useState<IProduct[]>([]);

    const [user, setUser] = useState<IUser | undefined>(undefined);

    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (localStorage.token) {
            const response = await fetch('/getUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'token': localStorage.token
                })
            });
            const body = await response.json();
            if (Object.keys(body).length === 0) {
                setUser(undefined);
            } else {
                setUser(body);
            }
        }
    }, []);

    return (
        <BrowserRouter>
            <Header toggleSidebar={() => setSidebarVisible(!sidebarVisible)} user={user}
                    productCount={shoppingCart.length}/>
            <Sidebar sidebarVisible={sidebarVisible} user={user}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/menu"
                       element={<Menu addProduct={product => setShoppingCart([...shoppingCart, product])}/>}/>
                <Route path="/checkout"
                       element={<Checkout products={shoppingCart} clearBasket={() => setShoppingCart([])}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    );
}