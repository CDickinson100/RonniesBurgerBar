import React, {useEffect, useState} from 'react';

import './Menu.css';
import {IProduct} from "../../IProduct";
import {MenuCategory} from "../menu-category/MenuCategory";

export function Menu() {

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
            <MenuCategory category="Burgers" products={products.filter(value => value.category === "Burger")}/>
            <MenuCategory category="Sides" products={products.filter(value => value.category === "Side")}/>
            <MenuCategory category="Drinks" products={products.filter(value => value.category === "Drink")}/>
        </div>
    );
}