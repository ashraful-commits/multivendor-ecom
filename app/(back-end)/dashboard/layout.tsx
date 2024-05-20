'use client';
import React, { useState, useEffect,useRef } from 'react';
import Sidebar from './../../../components/backend/Sidebar';
import Navbar from './../../../components/backend/Navbar';

const Layout = ({ children }:{ children: ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div  className="flex min-w-[99vw] relative min-h-screen">

        <div
          className={`w-72 transition-all duration-500 ease-in-out delay-100  ${
            showSidebar ? 'max-sm:fixed block transition-all duration-1000 ease-in-out  top-0 z-[999999] left-0' : '  top-0 left-0 hidden transition-all duration-500 ease-in-out delay-100'
          } max-h-screen sticky top-0 left-0 `}
        >
          <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        </div>
   

      {/* Main body */}
      <div className="relative w-full dark:bg-white bg-slate-900">
        <div className="w-full top-0 right-0 sticky">
          <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        </div>
        <div className="px-5 dark:bg-white bg-slate-900 min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
