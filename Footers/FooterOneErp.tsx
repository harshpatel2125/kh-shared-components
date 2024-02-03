"use client";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const Footer = ({}) => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {pathname !== "/login" ? (
        <p className='text-[9px] float-end px-4 mt-0.5 text-neutral-400'>
          © {currentYear} KH Exports India Private Limited. All rights reserved. <span className='ml-2'>version 0.1.0</span>
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
