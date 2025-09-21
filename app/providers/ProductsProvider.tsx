"use client"

import { useEffect, useCallback } from "react";
import { ConfiguredProduct, getProducts, isFetchingProducts } from "../redux/data/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypes";
import { ProductSystem } from "../api/product";

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { productsDataFetchingSettings } = useAppSelector((state) => state.products)
    

    const productsGetter = useCallback((data: ConfiguredProduct[]) => {
        dispatch(getProducts(data));
    }, [dispatch]);

    useEffect(() => {
        ProductSystem.fetchProducts(
            { limit: productsDataFetchingSettings.limit, page: productsDataFetchingSettings.page },
            productsGetter,
            (state: boolean) => dispatch(isFetchingProducts(state)),
        )
    }, [dispatch, productsDataFetchingSettings.limit, productsDataFetchingSettings.page, productsGetter]);
    
    return children
}

export default ProductsProvider