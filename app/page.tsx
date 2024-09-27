import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Spices from "@/components/Spices";
import Chips from "@/components/Chips";
import AllSpices from "@/components/AllSpices";
import AllSpices2 from "@/components/AllSpices2";
import AllSpices3 from "@/components/AllSpices3";
import Footer from "@/components/Footer";





export default async function Home() {

  
   
  return (
      <div  className="">
        <section className="">
         <Banner />
        </section>

        <section>
         <Spices />  
        </section>

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
        
        <section>
          <Footer />
        </section>
      
      

      </div>
  
  );
}
  