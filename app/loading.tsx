import React from "react";
import { Vortex } from "react-loader-spinner";

const loading = () => {
  return (
      <Vortex
        height={80}
        width={80}
        color="#000"
        visible={true}
      />
  );
};

export default loading;
