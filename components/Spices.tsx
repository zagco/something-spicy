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
    <CarouselItem className="slide md:basis-1/2 lg:basis-1/3">
        <h1  className="raleway text-2xl font-extrabold text-center lg:text-left">Tumeric</h1>
        <Image className="rounded-3xl  mt-4" width={400} height={400} src={slide1} alt="slide" />
        <p className="raleway text-center text-lg mt-3">
        Bold, golden, and packed with goodness—our Turmeric adds rich flavor and vibrant color to any dish!
        </p>
    </CarouselItem>

    <CarouselItem className="slide md:basis-1/2 lg:basis-1/3">
    <h1 className="raleway text-2xl font-extrabold text-center lg:text-left">Six Gun</h1>
        <Image className="rounded-3xl  mt-4"width={400} height={400} src={slide2} alt="slide"/>
        <p className="raleway text-center text-lg mt-3">
        Kick up the flavor with Crown National's Six Gun Grill Spice—bold, smoky, and perfect for grilling any meat to perfection
        </p>
    </CarouselItem>

    <CarouselItem className="slide md:basis-1/2 lg:basis-1/3">
        <div className="items-center">
        <h1 className="raleway text-2xl  font-extrabold text-center lg:text-left">Veg Seasoning</h1>
        <Image className="rounded-3xl  mt-4" width={400} height={400} src={slide3} alt="slide"/>
        <p className="raleway text-center text-lg mt-3">
        Add a burst of flavor to your veggies with our Veg Seasoning—a blend of herbs and spices that will make your veggies sing!
        </p>
       </div>
    </CarouselItem>

    <CarouselItem className="slide md:basis-1/2 lg:basis-1/3">
    <h1 className="raleway text-2xl font-extrabold text-center lg:text-left">Hot Wet Masala</h1>
    <Image className="rounded-3xl mt-4" width={400} height={400} src={slide4} alt="slide"/>
        <p className="raleway text-center text-lg mt-3">
        Turn up the heat with our Hot Wet Masala—rich, spicy, and full of bold, fiery flavors!
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
