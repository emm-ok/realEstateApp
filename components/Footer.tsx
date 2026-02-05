import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-16 bg-gray-900 text-white text-center">
      <p>
        &copy; {new Date().getFullYear()} Real Estate Co. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
