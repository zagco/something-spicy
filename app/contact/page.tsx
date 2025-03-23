import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="raleway bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="rakkas text-6xl font-bold text-center mb-8">Contact Us</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-4">We&apos;d love to hear from you! Please fill out the form below to send us a message.</p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Your message"
                  rows={5}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-3 px-4 rounded"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-4">Feel free to reach out to us through any of the following methods:</p>
            <ul>
              <li className="mb-2"><strong>Email:</strong> sales@somethingspicy.co.za</li>
              <li className="mb-2"><strong>Phone:</strong> 071 169 9870</li>
              <li className="mb-2"><strong>Address:</strong> Something Spicy SA, Scott Street, Scottburgh, 4180 (Stall No: 14)</li>
            </ul>
            <h3 className="text-xl font-semibold mb-4 mt-8">Follow Us</h3>
            <ul className="flex space-x-4">
              <li><a href="https://web.facebook.com/profile.php?id=100085998387126" className="hover:underline">Facebook</a></li>
              <li><a href="https://www.instagram.com/somethingspicysa_/" className="hover:underline">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@somethingspicysa" className="hover:underline">TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Contact;
