'use client'

import React from 'react';
import Image from 'next/image';
import company1 from "@/components/images/company1.jpg"
import company2 from "@/components/images/company2.png"
import company3 from "@/components/images/company3.png"
import company4 from "@/components/images/company4.png"
import Sanele from "@/components/images/Sanele.jpg"
import Sandile from "@/components/images/Sandile.jpg"
import Footer from '@/components/Footer';




const About: React.FC = () => {

  const testimonials = [
  { id: 1, message: "I bought the G-Force sauce from Something Spicy, and I absolutely loved it! The flavor is incredible, and I encourage everyone to give it a try. You won’t be disappointed!", name: "Bafana" },
  { id: 2, message: "I love the spices from Something Spicy! Their blends are full of flavor, and I especially appreciate that they include bay leaves in their mixes. It's a pleasure to visit!", name: "Mrs Cele" },
  { id: 3, message: "I bought spices from Something Spicy, and they are amazing! The spices smell so good and make my food taste 10x better. I love them so much!", name: "Jabu" },

  { id: 4, message: " just wanna thank you for the amazing experience I had when I was buying my spices at Something Spice. You guys are friendly and very neat and clean. Keep the good work 💃🏿💃🏿", name: "Nokubonga" },
];

  
  return (
    <section className="raleway bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="rakkas text-6xl font-bold text-center mb-8">About Us</h2>
        <div className="flex flex-wrap -mx-4 mb-12">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold mb-4">Our Story</h3>
            <p className="mb-4">
            Founded in 2022, Something Spicy SA began with a simple yet powerful mission: to bring high-quality, 
            affordable spices to our community. What started as a humble spice shop has since blossomed into 
            something much more. As we've grown, so too has our passion for offering a wider variety of products. 
            Today, in addition to our carefully curated selection of spices, 
            we proudly offer a diverse range of items, including savory chips, rich sauces, and much more.
            </p>
            <p className="mb-4">
            From the very beginning, our customers have been at the heart of everything we do. With each satisfied customer, 
            we are reminded of our purpose, and our commitment to providing exceptional products only strengthens. As we continue
            on this exciting journey, we remain dedicated to serving our community, always keeping quality and affordability at the
            forefront of our mission.
            </p>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-wrap -mx-2">
              <div className="lg:w-1/3 sm:w-1/3 md:w-1/3 px-2 mb-4">
                <Image src={Sandile} alt="Director 1" className="w-full h-auto max-w-xs mx-auto rounded shadow-lg object-cover" />
                <h4 className="text-lg font-semibold mt-2 text-center">Sandile Cele</h4>
                <p className="text-gray-600 text-center">Co-Founder & CEO</p>
              </div>
              <div className="lg:w-1/3 sm:w-1/3 md:w-1/3  px-2 mb-4">
                <Image src={Sanele} alt="Director 2" className="w-full h-auto max-w-xs mx-auto rounded shadow-lg object-cover" />
                <h4 className="text-lg font-semibold mt-2 text-center">Sanele Tom</h4>
                <p className="text-gray-600 text-center">Co-Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Our Vision & Mission</h3>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <h4 className="text-xl font-semibold mb-4">Our Vision</h4>
              <p>
              At Something Spicy SA, we envision a world where high-quality, flavorful ingredients are accessible to all. We aim to 
              be more than just a place to buy spices—we want to be a trusted source for products that enhance every meal, 
              bring people together, and make everyday cooking an adventure. As we continue to expand, 
              our goal is to grow with our community, always keeping affordability and exceptional taste within reach for everyone.
              </p>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
              <p>
              Our mission is simple yet profound: to offer high-quality, affordable products that bring flavor and happiness to our customers’ lives. 
              Starting with our core offering of spices, we have expanded to include chips, sauces, and more, always staying true to our belief that
              great taste should never come at a high cost. 
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Companies We Work With</h3>
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-1/2 sm:w-1/4 px-4 mb-4">
              <Image src={company1} alt="Company 1" className="w-full h-auto" />
            </div>
            <div className="w-1/2 sm:w-1/4 px-4 mb-4">
              <Image src={company2} alt="Company 2" className="w-full h-auto" />
            </div>
            <div className="w-1/2 sm:w-1/4 px-4 mb-4">
              <Image src={company3} alt="Company 3" className="w-full h-auto" />
            </div>
            <div className="w-1/2 sm:w-1/4 px-4 mb-4">
              <Image src={company4} alt="Company 4" className="w-full h-auto" />
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">Testimonials</h3>
        <div className="no-scrollbar overflow-x-auto py-4">
      <div className="flex space-x-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex-shrink-0 w-80 p-4 border border-gray-200 bg-white rounded-lg flex flex-col justify-between h-48">
            <p className="text-center break-words flex-grow">{testimonial.message}</p>
            <p className="text-center mt-2 font-bold">- {testimonial.name}</p>
          </div>
        ))}
      </div>
     
    </div>
      </div>
      <Footer />
    </section>
   
  );
};

export default About;
