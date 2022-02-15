import React, {FC} from 'react';

import './MenuCategory.css';
import {IProduct} from "../../IProduct";
import {Product} from "../product/Product";

export const MenuCategory: FC<{ category: string, products: IProduct[] }> = ({category, products}) => {
    return (
        <div className="menu-category">
            <h1>{category}</h1>
            <div className="category-products">
                {products.map(product => <Product product={product}/>)}
            </div>
        </div>
    );
}