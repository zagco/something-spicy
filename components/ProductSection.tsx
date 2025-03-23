// components/ProductSection.tsx
'use client'
import React from 'react';
import { Product, Section } from '@/types/types';
import LocationDrawer from './LocationDrawer';
import { Separator } from "@/components/ui/separator"

interface ProductSectionProps {
  section: Section;
}

const ProductSection: React.FC<ProductSectionProps> = ({ section }) => {
  return (
    <div className='p-4'>
      <h2 className='rakkas text-3xl mt-9'>{section.name}</h2>
      
      <div className='mt-9 flex overflow-x-scroll space-x-1 p-4 no-scrollbar'>
        {section.products.map((product) => (
          <div
            className="object-contain lg:w-[17rem] min-h-[40px] transition-transform duration-[450ms] mr-[8px] ml-3 shadow-md cursor-pointer h-[435px] rounded-[8px] pt-4 p-5 min-w-[14rem]"
            key={product.productId}
          >
            <img className="max-w-full aspect-[2/1] object-cover h-[13rem] rounded" src={product.image} alt={product.name} />
            <div className="">
              <div>
                <h2 className="raleway mt-4 text-lg font-extrabold break-words whitespace-normal overflow-auto h-[50px] no-scrollbar">{product.name}</h2>
                <p className="rakkas text-[#000000] text-2xl mb-[7px] break-words whitespace-nowrap overflow-hidden text-ellipsis">R {product.price}</p>
                <p className="raleway text-gray-700 font-extrabold break-words whitespace-normal overflow-auto h-[50px] no-scrollbar">{product.description}</p>
                <LocationDrawer />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;