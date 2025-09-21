import React from "react";
import Dashboard from "../Dashboard";
import Orders from "./Orders";

const page = (): React.ReactElement => {
  return (
    <Dashboard>
      <Orders />
    </Dashboard>
  );
};

export default page;