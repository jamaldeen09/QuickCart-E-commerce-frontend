"use client"
import React from "react";
import Dashboard from "../Dashboard";
import ProductList from "./ProductList";

const page = (): React.ReactElement => {
  return (
    <Dashboard>
      <ProductList />
    </Dashboard>
  );
};

export default page;