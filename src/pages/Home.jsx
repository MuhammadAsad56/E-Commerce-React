import react from "react"
import { useContext } from "react";
import { HeaderLinksContext } from "../context/AuthContext";
import "./productDetail.css"
import {Animated} from "react-animated-css";
import Image from '../images/girl-pointt.jpg'
import { Link } from "react-router-dom";
// import { MdArrowRightAlt } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Home = () => {
    const {headerLinks, setHeaderLinks} = useContext(HeaderLinksContext)    
    
    return(
     <>
     <section className="text-gray-600 bg-slate-100 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img
        className="object-cover object-center rounded"
        alt="hero"
        src={Image}
      />
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <div className="pulse-infinite sale mb-5 bg-green-400 hover:bg-green-600">
            <p className="text-5xl text-center pt-5 m-0 text-white">Sale</p>
            <p className="text-white font-medium text-center text-xl pt-2">50% Off</p>
        </div>

      <p className="mb-5 leading-relaxed text-3xl shopping-para">
        To Chalen Shopping Par
      </p>
      <div className="flex justify-center">
        <Link onClick={()=> setHeaderLinks("/products")} to={"/products"}>
        <button className=" inline-flex items-center text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-xl">
          Let's Go <MdArrowForwardIos className="ml-3"/>
        </button>
        </Link>
      </div>
    </div>
  </div>
</section>

     </>
    )
}
export default Home