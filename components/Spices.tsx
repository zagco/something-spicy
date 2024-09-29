import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import slide1 from "./images/slide1.png"
import slide2 from "./images/slide2.png"
import slide3 from "./images/slide3.png"
import slide4 from "./images/slide4.png"

  
function Spices() {
  return (
    <div className="p-11">
      <h1 className='rakkas text-4xl lg:text-5xl text-center'>Top Spices We Offer</h1>

      <div>
      
<Carousel className="mt-9 p-0">
  <CarouselContent>
    <CarouselItem className="slide md:basis-1/2 lg:basis-1/3 flex flex-col items-center">
    <h1 className="raleway text-2xl font-extrabold text-center">Tumeric</h1>
    <div className="flex-grow flex items-center justify-center mt-4">
        <Image className="rounded-3xl" width={400} height={400} src="https://firebasestorage.googleapis.com/v0/b/something-spicy.appspot.com/o/Tumeric_.png?alt=media&token=c56e3a36-a05c-4131-8deb-1f30e44cb526" alt="slide" />
    </div>
    <p className="raleway text-center text-lg mt-3">
    Turmeric, the golden spice of life—warm, earthy flavors with a vibrant hue that adds color and vitality to every dish
    </p>
</CarouselItem>
<CarouselItem className="slide md:basis-1/2 lg:basis-1/3 flex flex-col items-center">
    <h1 className="raleway text-2xl font-extrabold text-center">Six Gun</h1>
    <div className="flex-grow flex items-center justify-center mt-4">
        <Image className="rounded-3xl" width={400} height={400} src="https://firebasestorage.googleapis.com/v0/b/something-spicy.appspot.com/o/sixgun-removebg-preview.png?alt=media&token=2b7220b1-2b90-4c66-b0a1-82df3242cc05" alt="slide" />
    </div>
    <p className="raleway text-center text-lg mt-3">
    Kick up the flavor with Crown National's Six Gun Grill Spice—bold, smoky, and perfect for grilling any meat to perfection
    </p>
</CarouselItem>

<CarouselItem className="slide md:basis-1/2 lg:basis-1/3 flex flex-col items-center">
    <h1 className="raleway text-2xl font-extrabold text-center">Veggie Seasoning</h1>
    <div className="flex-grow flex items-center justify-center mt-4">
        <Image className="rounded-3xl" width={400} height={400} src="https://firebasestorage.googleapis.com/v0/b/something-spicy.appspot.com/o/veggei_.png?alt=media&token=413f572a-ecf6-4f1d-afc9-cc95bc2b9e0b" alt="slide" />
    </div>
    <p className="raleway text-center text-lg mt-3">
    Add a burst of flavor to your veggies with our Veg Seasoning—a blend of herbs and spices that will make your veggies sing!
    </p>
</CarouselItem>
<CarouselItem className="slide md:basis-1/2 lg:basis-1/3 flex flex-col items-center">
    <h1 className="raleway text-2xl font-extrabold text-center">Hot Wet Masala</h1>
    <div className="flex-grow flex items-center justify-center mt-4">
        <Image className="rounded-3xl" width={400} height={400} src="https://firebasestorage.googleapis.com/v0/b/something-spicy.appspot.com/o/hot_wet_masala_.png?alt=media&token=b55165c8-a008-4bab-8c47-0d0c9700aed3" alt="slide" />
    </div>
    <p className="raleway text-center text-lg mt-3">
    Hot Wet Masala: a bold, fiery blend with intense spices, perfect for rich, flavorful curries that pack serious heat and depth
    </p>
</CarouselItem>


    
  </CarouselContent>
  <CarouselPrevious className="hidden lg:flex lg:ml-5"/>
  <CarouselNext className="hidden lg:flex lg:mr-5"/>
</Carousel>

      </div>

     
    </div>
  )
}

export default Spices
