import React from 'react';
import {InstagramIcon, FacebookIcon} from "lucide-react"

const Footer: React.FC = () => {
  return (
    
    <footer className="raleway bg-[white] text-black py-8 border-t border-gray-200">
    

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Company</h5>
            <ul>
              <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
           
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Support</h5>
            <ul>
              <li className="mb-2"><a href="/contact" className="hover:underline">Help Center</a></li>
              <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
   
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Follow Us</h5>
            <ul className="flex space-x-4">
              <li><a href="https://web.facebook.com/profile.php?id=100085998387126" className="hover:underline"><FacebookIcon /></a></li>
              
              <li><a href="https://www.instagram.com/somethingspicysa_/" className="hover:underline"><InstagramIcon /></a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Newsletter</h5>
            <form>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 mb-2 text-gray-800 border border-gray-200 rounded"
              />
              <button className="w-full bg-black hover:bg-black text-white font-bold py-2 px-4 rounded">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>© 2024 Something Spicy SA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
