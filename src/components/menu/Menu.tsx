import React, {FC, useEffect, useState} from 'react';

import './Menu.css';
import {IProduct} from "../../IProduct";
import {MenuCategory} from "../menu-category/MenuCategory";

export const Menu: FC<{ addProduct: (product: IProduct) => void }> = ({addProduct}) => {

    const [products, setProducts] = useState<IProduct[]>([]);

    async function getData() {
        const response = await fetch('/products', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const body = await response.json();
        setProducts(body);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="menu">
            <MenuCategory category="Burger" addProduct={addProduct} products={products}/>
            <MenuCategory category="Side" addProduct={addProduct} products={products}/>
            <MenuCategory category="Drink" addProduct={addProduct} products={products}/>
        </div>
    );
}