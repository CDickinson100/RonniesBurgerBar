import React, {FC} from 'react';

import './MenuCategory.css';
import {IProduct} from "../../IProduct";
import {Product} from "../product/Product";

export const MenuCategory: FC<{ category: string, products: IProduct[], addProduct: (product: IProduct) => void }> =
    ({category, products, addProduct}) => {
        return (
            <div className="menu-category">
                <h1>{category}</h1>
                <div className="category-products">
                    {products
                        .filter(product => product.category === category)
                        .map((product, index) =>
                            <Product addProduct={() => addProduct(product)} product={product} key={index}/>
                        )
                    }
                </div>
            </div>
        );
    }