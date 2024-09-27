'use client'

import { MenuIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Link from "next/link"

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      eventData.event.preventDefault();
      setIsOpen(false);
    },
    onSwipedRight: (eventData) => {
      eventData.event.preventDefault();
      setIsOpen(false);
    },
    trackMouse: true,
  });

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-black text-white rounded"
      >
       <MenuIcon />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
      <div
        {...handlers}
        className={`fixed top-0 right-0 h-full bg-white text-black w-64 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={toggleDrawer}
          className="p-2 bg-black text-white rounded m-4"
        >
          <XIcon />
        </button>
        <ul className="mt-8 raleway font-bold">
        <Link href="/"onClick={toggleDrawer} >
            <h2 className="p-4 border-b border-gray-200">Home</h2>
        </Link>
          <Link href="/about"onClick={toggleDrawer} >
            <h2 className="p-4 border-b border-gray-200">About Us</h2>
        </Link>
        <Link href="/contact"onClick={toggleDrawer} >
            <h2 className="p-4 border-b border-gray-200">Contact Us</h2>
        </Link>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
