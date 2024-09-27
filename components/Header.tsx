
import Image from "next/image"
import Link from "next/link"
import something_spicy_logo from "./images/something_spicy_logo.png"
import MenuBar from "./MenuBar"

function Header() {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto">
       <Link href="/" >
      <Image 
        className="rounded-lg"
        src={something_spicy_logo}
        width={150}
        height={150}
        alt="logo"
      />
      </Link>

      <div className="flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p2 rounded-md 
        flex-1 mx-2 max-w-96 ">
          
        </form>
      </div>

      <div className="flex items-center space-x-4 px-6 -mb-7">
      <Link href="/" className="icon hidden md:flex">
            <h2 className="rakkas text-2xl">Home</h2>
      </Link>

        <Link href="/about" className="icon hidden md:flex">
            <h2 className="rakkas text-2xl">About Us</h2>
        </Link>

        <Link href="/contact" className="icon hidden md:flex">
            <h2 className="rakkas text-2xl">Contact Us</h2>
        </Link>

       
       <div className="lg:hidden md:hidden"><MenuBar /></div>
        

      </div>
    </div>
  )
}

export default Header