import React from "react";
import { Vortex } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="animate-spin">
      <Vortex
        height={80}
        width={80}
        color="#000"
        visible={true}
      />
    </div>
  );
};

export default loading;
