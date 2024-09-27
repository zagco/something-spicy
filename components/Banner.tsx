'use client'

import React from 'react'
import { Button } from './ui/button'
import bannerImage from "./images/bannerImage.png"
import Image from "next/image"
import Link from 'next/link'

function Banner() {


  const scrollToSection = () => {
    document.getElementById('target-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>

    <div className='p-8 lg:w-1/2 mb-0 lg:mb-0 text-center lg:text-left'>
      <h1 className='rakkas text-4xl font-bold mb-4 lg:text-5xl' >Welcome To Something Spicy SA</h1>
      <p className='raleway text-lg'>Add Flavor, Depth, and Excitement to Every Meal with Our Carefully Sourced Spices!</p>
    </div>

    <div className='lg:w-1/2 flex flex-col lg:flex-row justify-center lg:justify-start mb-2 p-3 lg:mb-0'>
    <Button variant="outline" size="lg"  onClick={scrollToSection} className='py-2 px-4 rounded lg:w-[25rem] mb-4 lg:mb-0 lg:mr-4 lg:ml-5 md:ml-0 sm:ml-0'>Top Deals of the Week</Button>
    <Link href="/contact" className='block w-full'>
  <Button size="lg" className='block w-full lg:w-[15rem] py-2 px-4 rounded mb-4 lg:mb-0 lg:mr-4 lg:ml-5 md:ml-0 sm:ml-0'>
    Not Sure What You Looking For ?
  </Button>
</Link>
      
    </div>

    <div className="">
    <Image 
        className="p-4 w-full h-auto rounded shadow-lg object-cover"
        src={bannerImage}
        
        alt="logo"
      />
    </div>
    
    </div>
  )
}

export default Banner
