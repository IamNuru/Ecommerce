import React, { useEffect, useState, useRef} from 'react'
import Carousel from "react-elastic-carousel";
import { Link } from 'react-router-dom';
import "../../styles/Sliders.css";


const HomePageCarousel = () => {

    const carouselRef = useRef();
    const [products, setProducts] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.MIX_APP_API_URL}/homepage/carousel`)
            .then(res=>{
                setProducts(res.data)
            }).catch(err =>{
                setProducts(null) })
    },[])
    

    const itemsPerPage = 1
    const totalPages = Math.ceil(5 / itemsPerPage)
    let resetTimeout;
    return (
        <>
        {
            products?.length > 0 &&
            <div className="carousel relative container mx-auto" style={{maxWidth:'1600p'}}>
                <div className="carousel-inner relative overflow-hidden w-full">
                    <Carousel transitionMs={1500} 
                    autoPlaySpeed={4000} ref={carouselRef} 
                    enableAutoPlay={true}
                        onNextEnd={({ index }) => {
                            clearTimeout(resetTimeout)
                            if (index + 1 === totalPages) {
                               resetTimeout = setTimeout(() => {
                                  carouselRef.current.goTo(0)
                              }, 1500) // same time
                            }
                       }}
                       itemsToShow={itemsPerPage}
                   >
                    {
                        products.map((product, index) =>{
                            return <div className="w-full" style={{height:'50vh'}} key={index}>
                                <div className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right" style={{backgroundImage: `url(${process.env.MIX_APP_URL}/storage/images/products/${product.image})`}}>
                                    <div className="container mx-auto">
                                        <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                                            <p className="text-black text-xl my-4 text-pink-600 font-semibold">{product.title}</p>
                                            <Link to={`/product/${product.id}`} 
                                            className="text-xl font-light text-blue-400 bg-pink-100 px-2 inline-block no-underline border-b 
                                            border-gray-600 leading-relaxed hover:text-blue-700 hover:border-pink-700 hover:bg-white transition duration-400"
                                            >view product</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    
                    </Carousel>
                </div>
            </div>
            }
        </>
    )
}

export default HomePageCarousel
