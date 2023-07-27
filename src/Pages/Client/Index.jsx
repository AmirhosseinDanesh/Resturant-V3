import React, { useEffect, useState, useRef } from 'react'

import { DataUrlV1 } from '../../Data/Data';
import { SwiperSlide } from 'swiper/react'

import Header from '../../Components/Header/Header'
import Slider from '../../Components/Slider/Slider'
import ProductCart from "../../Components/ProductCart/ProductCart"
import ReactLoading from 'react-loading';

export default function Index() {
  const [allProducts, setAllProducts] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [filterProducts, setFilterProducts] = useState(allProducts);
  const ref = useRef(null);

  const filterCategory = (id) => {
    let filteringCategory = allProducts.filter(pr => pr.categoryID._id === id);
    setFilterProducts(filteringCategory);
    console.log(filteringCategory);
  }


  useEffect(() => {
    fetch(`${DataUrlV1}/courses`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data)
        setFilterProducts(data)
      })
  
    fetch(`${DataUrlV1}/category`)
      .then(res => res.json())
      .then(data => setAllCategory(data))
  }, [])

  return (
    <>
      <Header />
      <Slider >
        <SwiperSlide className='overflow-y-visible' >
          <div className="bg-slide-1-M md:bg-slide-1-D relative xs:h-auto xs:aspect-[2/1] h-[250px] bg-no-repeat bg-cover bg-[center_top]">
            <div className="container relative overflow-y-hidden h-full md:min-h-screen flex justify-end items-center text-white">
              <div className=''>
                <h2 className="font-MorabbaBold text-2xl md:text-6xl mb-0.5 md:mb-7">رستوران مدیران</h2>
                <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-7"></span>
                <span className="font-MorabbaLight text-xl md:text-5xl ">در کنار ما امنیت غذایی را احساس کنید.</span>
                <h2 className="max-w-[201px] md:max-w-[400px] text-xs md:text-2xl"></h2>
              </div>
              {/* circles */}
              <div className='absolute right-0 bottom-0 left-0 mx-auto translate-y-1/2 w-[203px] h-[203px]  rounded-full border border-white/25 hidden md:flex items-center justify-center'>
                <div className='w-[145px] h-[145px] rounded-full border border-white/50 flex items-center justify-center'>
                  <div className='w-[95px] h-[95px] rounded-full border border-white/80 flex items-center justify-center'>
                  </div>
                </div>
              </div>
            </div>
            {/* svg */}
            <svg className='absolute right-0 bottom-0 left-0 mx-auto text-gray-100 dark:text-zinc-800 w-[100px] h-[22px] hidden md:block' width="100" height="22" viewBox="0 0 100 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z" />
            </svg>

            <div className='cursor-pointer hidden md:flex items-center justify-center absolute right-0 bottom-0 left-0 mx-auto translate-y-1/2 w-[30px] h-[30px] border-2 border-orange-300 rounded-full' onClick={() => {
              ref.current?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <svg className="w-4 h-4 text-zinc-700 dark:text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </SwiperSlide>
      </Slider>
      <section ref={ref} className='products-section pt-8 md:pt-20 lg:pt-48 my-8'>
        <div className='container'>
          {/* section Head */}
          <div className='flex justify-center items-center mb-5 md:mb-12'>
            <div className='text-zinc-700 dark:text-white'>
              <h3 className='text-2xl md:text-5xl font-MorabbaMedium '>دسته بندی محصولات</h3>
            </div>
          </div>

          <div className='my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  place-items-center'>
            <button className='w-28 sm:w-32 md:w-36 lg:w-40 text-gray-800 bg-gradient-to-r from-orange-300 to-orange-400 hover:bg-gradient-to-l font-MorabbaBold rounded-2xl text-sm text-center py-3 px-2 my-2'
              onClick={()=>{
                setFilterProducts(allProducts)
              }}
            >
              همه
            </button>
            {
              allCategory.map((cat) => (
                <button className='w-28 sm:w-32 md:w-36 lg:w-40 text-gray-800 bg-gradient-to-r from-orange-300 to-orange-400 hover:bg-gradient-to-l font-MorabbaBold rounded-2xl text-sm text-center py-3 px-2 my-2'
                  onClick={() => {
                    filterCategory(cat._id)
                  }}
                >
                  {cat.title}
                </button>
              ))
            }
          </div>
          {/* section body */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5'>
            {
              allProducts.length ? (
                filterProducts.map((pro) => (
                  <ProductCart key={pro._id} {...pro} />
                ))
              ) : (
                <div className='flex w-full justify-center items-center text-center col-start-1 col-end-8 backdrop-blur-sm h-[200px] md:h-[400px]'>
                  <ReactLoading type={"bubbles"} color={"white"} height={75} width={75} />
                </div>
              )
            }
          </div>
        </div>
      </section>
    </>
  )
}
