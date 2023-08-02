import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrl } from '../../Data/Data'
import { Slide, ToastContainer } from 'react-toastify'
import ProductsContext from "../../Context/ProductsContext"
import { toast } from 'react-toastify'

export default function ProductCart({ ...pro }) {
    const contextData = useContext(ProductsContext)

    const updateLocalStorage = (cart) => {
        localStorage.setItem('userCart', JSON.stringify(cart));
    }

    const addToCart = (pro) => {
        toast.success("محصول با موفقیت به سبد خرید اضافه شد.")
        console.log("first")
        let newUserProductCart = {
            id: pro._id,
            name: pro.name,
            price: pro.price,
            count: 1,
            cover: pro.cover,
            discount: pro.discount
        }

        let isProductInCart = contextData.userCart.some(product => (
            product.name === pro.name
        ))

        if (!isProductInCart) {
            let updatedCart = [...contextData.userCart, newUserProductCart];
            updateLocalStorage(updatedCart);
            contextData.setUserCart(updatedCart);

        } else {
            let updatedCart = contextData.userCart.map(product => {
                if (product.name === pro.name) {
                    return {
                        ...product,
                        count: product.count + 1
                    };
                }
                return product;
            });

            contextData.setUserCart(updatedCart);
            updateLocalStorage(updatedCart);
        }
    }

    return (
        <>
            <div className='flex sm:block gap-x-4 items-center  p-2 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl'>
                <NavLink className="relative w-1/2  md:mb-5" to={`/products/${pro.shortName}`}>
                    {
                        (pro.cover) ? (
                            <img loading='lazy' className="rounded-2xl md:h-64 object-contain" src={`${DataUrl}/courses/covers/${pro.cover}`} alt="" />
                        ) : (
                            <img loading='lazy' className="rounded-2xl md:h-64 object-contain" src="/images/blogs/nocover.png" alt="" />
                        )
                    }
                    {
                        (pro.discount) ? (
                            <span className='absolute -top-2.5 -right-3 md:right-8 block h-[30px] !leading-[34px] font-DanaMedium text-xs md:text-base text-white dark:text-zinc-700 bg-orange-300 px-1.5 rounded-full'>
                                {pro.discount}%
                            </span>
                        ) : (
                            <></>
                        )
                    }
                </NavLink>
                <div className='w-1/2 sm:w-full'>
                    <h5 className='font-DanaMedium text-sm xs:text-xl text-zinc-700 dark:text-white line-clamp-2 h-10 md:h-14 sm:mt-4'>
                        {pro.name}
                    </h5>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5 w-full'>
                            <div className='text-teal-600 dark:text-emerald-500'>
                                <span className='font-DanaMedium text-sm xs:text-xl'>{(pro.price - ((pro.discount * pro.price) / 100)).toLocaleString()}</span>
                                <span className='text-xs tracking-tighter mr-0.5'>تومان</span>
                            </div>
                            {
                                (pro.discount !== 0) ? (
                                    <div className='offer text-gray-400/80 flex justify-center items-center'>
                                        <span className='text-xs md:text-lg'>{pro.price.toLocaleString()}</span>
                                        <span className='hidden xl:inline text-sm tracking-tighter mr-0.5'>تومان</span>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                        <div className='hidden md:flex items-center justify-between mt-1.5'>
                            <div className='w-full'>
                                <span className='flex-center md:w-9 h-[26px] md:h-9 bg-gray-100 hover:bg-teal-600 dark:bg-zinc-800 dark:hover:bg-emerald-500 text-gray-400  hover:text-white rounded-full transition-all cursor-pointer ' onClick={() => {
                                    addToCart(pro)
                                }}>
                                    <svg className=" w-4 md:w-[22px] h-4 md:h-[22px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex md:hidden items-center justify-between mt-1.5'>
                        <div className='w-full'>
                            <span className='flex justify-center mt-4 items-center md:w-9 h-8 md:h-9 bg-green-700 text-white  hover:bg-green-800 dark:bg-emerald-500 dark:hover:bg-emerald-700 rounded-full transition-all cursor-pointer ' onClick={() => {
                                addToCart(pro)
                            }}>
                                <span className='md:hidden text-xs xs:text-sm'>اضافه کردن به سبد خرید</span>
                                {/* <svg className=" w-4 md:w-[22px] h-4 md:h-[22px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg> */}
                            </span>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    transition={Slide}
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={localStorage.getItem("theme")}
                />
            </div>

        </>
    )
}
