"use client"
import React from "react";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";


const page = (): React.ReactElement => {
  return (
    <Dashboard>
      <AddProduct />
    </Dashboard>
  );
};


export default page;