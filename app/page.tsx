import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Spices from "@/components/Spices";
import Chips from "@/components/Chips";
import AllSpices from "@/components/AllSpices";
import AllSpices2 from "@/components/AllSpices2";
import AllSpices3 from "@/components/AllSpices3";
import AllSpices4 from "@/components/AllSpices4";
import AllSpices5 from "@/components/AllSpices5";
import Footer from "@/components/Footer";
import VideoPlayer from '@/components/Video';





export default async function Home() {

  
   
  return (
      <div  className="">
        <section className="">
         <Banner />
        </section>

        <section>
         <Spices />  
        </section>
        <div className="container mx-auto p-4">

      <VideoPlayer src="/videos/test.mp4" />
    </div>

        <section>
          <AllProducts />
        </section>
        <section>
          <Chips />
        </section>

        <section>
          <AllSpices />

        
        </section>

 
          <AllSpices2 />
          <AllSpices3 />
          <AllSpices4 />
          <AllSpices5 />
        
        <section>
          <Footer />
        </section>
        
      
      

      </div>
  
  );
}
  