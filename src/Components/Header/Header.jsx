import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrl, DataUrlV1 } from "../../Data/Data"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/authContext'

import ProductsContext from '../../Context/ProductsContext'
import { toast } from 'react-toastify'
import Toast from '../Toast/Toast'


export default function Header() {
  const contextData = useContext(ProductsContext)
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const [headerRightNavbar, setHeaderRightNavbar] = useState(false)
  const [headerLeftNavbar, setHeaderLeftNavbar] = useState(false)

  const clearCart = () => {
    localStorage.setItem('userCart', []);
    contextData.setUserCart([])
  }

  const updateLocalStorage = (cart) => {
    localStorage.setItem('userCart', JSON.stringify(cart));
  }

  const addToCart = (pro) => {

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

  const removeProducts = (pro) => {
    const updatedCart = contextData.userCart.map(product => {
      if (product.id === pro.id) {
        if (product.count > 1) {
          product.count -= 1;
          return product;
        } else {
          return null;
        }
      }
      return product;
    }).filter(item => item !== null);

    contextData.setUserCart(updatedCart);

    // ذخیره سبد خرید در localStorage
    localStorage.setItem('userCart', JSON.stringify(updatedCart));

    // بررسی و حذف محصول از localStorage اگر موجودیش صفر شده است
    if (product.count === 1) {
      const storedCart = localStorage.getItem('userCart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        const updatedStoredCart = parsedCart.filter(item => item.id !== pro.id);
        localStorage.setItem('userCart', JSON.stringify(updatedStoredCart));
      }
    }
  }

  const calculateTotalPrice = () => {
    return contextData.userCart.reduce((total, product) => {
      return total + (((product.price - ((product.discount * product.price) / 100)) * product.count));
    }, 0);
  }

  const removeProductFromCart = (product) => {
    const updatedCart = contextData.userCart.filter(p => p.id !== product.id);
    contextData.setUserCart(updatedCart)
    localStorage.setItem('userCart', JSON.stringify(updatedCart));

  }

  useEffect(() => {
    const cart = localStorage.getItem('userCart');
    if (cart) {
      contextData.setUserCart(JSON.parse(cart));
    }
  }, []);
  return (
    <>
      <header className='fixed top-9 right-0 left-0 hidden md:flex items-center px-5 lg:px-10 rounded-3xl w-[98%] lg:w-[90%] h-24 mx-auto bg-black/50 backdrop-blur-[6px] z-50'>
        <div className='flex items-center w-full justify-between'>
          {/* logo & Menu */}
          <nav className='flex items-center gap-x-5 lg:gap-x-9 h-14'>
            {/* logo */}
            <div className='flex-shrink-0'>
              <NavLink to="/">
                <img src="/images/app-logo.png" className='w-24' alt="Golden Coffee" />
              </NavLink>
            </div>
            {/* Menu */}
            <ul className='flex gap-x-5 xl:gap-x-9 h-full text-xl text-gray-300 tracking-tightest child:leading-[56px] child-hover:text-orange-300 transition-colors '>
              <li className='font-DanaMedium' >
                <NavLink className={({ isActive }) => (isActive) ? ("text-orange-200") : ("")} to="/">صفحه اصلی</NavLink>
              </li>
              <li className='font-DanaMedium'>
                <NavLink to="/about-us" className={({ isActive }) => (isActive) ? ("text-orange-200") : ("")}>درباره ما</NavLink>
              </li>
            </ul>
          </nav>

          {/* Cart & Login */}
          <div className='flex text-orange-200 text-xl gap-x-4 lg:gap-x-5 xl:gap-x-10'>
            {/* Cart and darkmode */}
            <div className='flex items-center gap-x-4'>
              {/* Cart */}
              <div className='relative group'>
                <div className='flex '>
                  {
                    contextData.userCart.length ? (
                      <>
                        <div className="t-2 absolute left-5">
                          <p className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500 p-3 text-xs text-white">{contextData.userCart.length}</p>
                        </div>
                        <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                      </>
                    ) : (
                      <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    )
                  }

                </div>
                {/*  */}
                <div className='absolute overflow-auto max-h-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 p-5  w-[400px] text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all'>
                  <div className='flex items-center justify-between font-DanaMedium text-xs tracking-tighter'>
                    <span className='text-gray-300'>{(contextData.userCart.length)} مورد</span>
                    <a href="#" className='flex items-center text-orange-300'>
                      مشاهده سبد خرید
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>

                    </a>

                  </div>
                  <div className='pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5'>
                    {
                      contextData.userCart.map(product => (
                        <div key={product.id} className='flex gap-x-2.5'>
                          <img src={`${DataUrl}/courses/covers/${product.cover}`} alt="p1" className='w-[120px] h-[120px]' />
                          <div className='flex flex-col justify-between w-full'>
                            <div className='flex justify-between items-center'>
                              <h4 className='font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2'>{product.name}</h4>
                              <button className='border  rounded-full p-px' onClick={() => {
                                removeProductFromCart(product)
                              }}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                              </button>
                            </div>
                            <div className='flex justify-between items-center gap-x-3 w-1/2  border p-2 text-orange-300 border-orange-300 rounded-full'>
                              <button onClick={() => {
                                addToCart(product)
                              }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                  <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                                </svg>
                              </button>
                              <span>{product.count}</span>
                              <button onClick={() => {
                                removeProducts(product)
                              }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                  <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                                </svg>
                              </button>
                            </div>
                            <div className='flex justify-between items-center'>
                              <div className="offer text-gray-400/80 flex justify-center items-center">
                                <span className="text-xs md:text-sm">{(product.price * product.count).toLocaleString()}</span>
                                <span className="hidden xl:inline text-sm tracking-tighter mr-0.5">تومان</span>
                              </div>
                              <div className='text-zinc-700 dark:text-white font-DanaBold'>
                                {
                                  ((product.price - ((product.discount * product.price) / 100)) * product.count).toLocaleString()
                                }
                                <span className='font-Dana text-sm mr-1'>
                                  تومان
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className='flex justify-between mt-5'>
                    {
                      contextData.userCart.length ? (
                        <>
                          <div>
                            <span className='font-DanaMedium text-gray-700 text-base tracking-tighter'>جمع كل سبد خريد:</span>
                          </div>
                          <div className='text-zinc-700 dark:text-white font-DanaBold '>
                            <span>
                              {calculateTotalPrice().toLocaleString()}
                            </span>
                            <span className='font-Dana text-sm mr-1'>
                              تومان
                            </span>
                          </div>
                          {/* <NavLink to="/cart" className='flex text-lg items-center justify-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-700 transition-colors hover:bg-teal-700 rounded-xl tracking-tightest'>ثبت سفارش</NavLink> */}
                        </>
                      ) : (
                        <>
                          <div className='w-full'>
                            <div className='text-zinc-700 dark:text-white font-DanaBold text-center '>
                              <span className='text-center'>
                                سبد خرید خالی است.
                              </span>
                            </div>
                          </div>
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
              {/* darkmode */}
              <div>
                <div className='py-3' id='toggle-theme' onClick={() => {
                  if (localStorage.theme === 'dark') {
                    document.documentElement.classList.remove('dark')
                    localStorage.theme = "light"
                  } else {
                    document.documentElement.classList.add('dark')
                    localStorage.setItem("theme", "dark")
                  }
                }} >
                  <svg className='w-8 h-8 inline-block dark:hidden' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                  <svg className='w-8 h-8 hidden dark:inline-block' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='flex md:hidden items-center justify-between bg-white dark:bg-zinc-700 h-16 px-4'>
        <div className='p-1 rounded-lg hover:bg-zinc-800/50 ' onClick={() => {
          setHeaderRightNavbar(true)
        }}>
          <svg className="w-6 h-6 text-zinc-700 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

        <NavLink to="/">
          <img src="images/app-logo.png" className='w-16' alt="" />
        </NavLink>

        <div className='p-1 rounded-lg hover:bg-zinc-800/50 ' onClick={() => {
          setHeaderLeftNavbar(true)
        }}>
          {
            contextData.userCart.length ? (
              <>
                <div className="t-3 absolute left-9">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500 p-1.5 text-xs text-white">{contextData.userCart.length}</p>
                </div>
                <svg className='w-5 h-5 dark:text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </>
            ) : (
              <svg className='w-5 h-5 dark:text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            )
          }
        </div>


      </div>


      {/* Right Navbar */}
      <div className={headerRightNavbar ? ("block md:hidden  fixed overflow-y-auto top-0 bottom-0 right-0 w-64 min-h-screen bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all") : ("fixed top-0 -right-64 w-64 min-h-screen bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all")}>
        {/* LOGO */}
        <div className='flex items-center justify-between pb-5 mb-6 border-b border-b-gray-100 dark:border-b-white/10'>
          <div className='text-orange-300'>
            <img src="/images/app-logo.png" className='w-16' alt="" />
          </div>
          <div className='p-1 rounded-lg hover:bg-zinc-800/50 ' onClick={() => {
            setHeaderRightNavbar(false)
          }}>
            <svg className="w-5 h-5 text-zinc-600 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        {/* Menu */}
        <div>
          <ul className=' text-zinc-600 dark:text-white space-y-6 '>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive) ? ("flex items-center bg-orange-200/20 text-orange-300 mb-4 h-10 rounded-md gap-x-2 pr-2") : ("flex items-center mb-4 h-10  rounded-md gap-x-2 pr-2")} >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                صفحه اصلی
              </NavLink>
            </li>

            {/* <li>
              <NavLink to="/articles" className={({ isActive }) => (isActive) ? ("flex items-center bg-orange-200/20 text-orange-300 mb-4 h-10 rounded-md gap-x-2 pr-2") : ("flex items-center mb-4 h-10  rounded-md gap-x-2 pr-2")} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                مقالات
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/about-us" className={({ isActive }) => (isActive) ? ("flex items-center bg-orange-200/20 text-orange-300 mb-4 h-10 rounded-md gap-x-2 pr-2") : ("flex items-center mb-4 h-10  rounded-md gap-x-2 pr-2")} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                درباره ما
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Info */}
        <div className='space-y-6 px-2.5 py-5 mt-6 border-t border-t-gray-100 dark:border-t-white/10'>
          {/* <div>
            {
              auth.isLoggedIn ? (
                <>
                  <NavLink to="/my-account/dashboard" className="flex items-center gap-x-2.5 tracking-tightest text-orange-300">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className='text-base tracking-normal'>
                      {auth ? (auth.userInfos.name) : ("")}
                    </span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className='items-center gap-x-2.5 flex text-orange-300'>
                    <svg className="w-6 h-6 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span className='text-base tracking-normal flex'>
                      ورود | ثبت‌نام
                    </span>
                  </NavLink>
                </>
              )
            }
          </div> */}
          <div>
            <div className='py-3 text-orange-300 flex gap-x-2.5 ' id='toggle-theme' onClick={() => {
              if (localStorage.theme === 'dark') {
                document.documentElement.classList.remove('dark')
                localStorage.theme = "light"
              } else {
                document.documentElement.classList.add('dark')
                localStorage.setItem("theme", "dark")
              }
            }} >
              <svg className='w-6 h-6 inline-block dark:hidden' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
              <span className='inline-block dark:hidden'>تم تیره</span>
              <svg className='w-6 h-6 hidden dark:inline-block' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              <span className='hidden dark:inline-block'>تم روشن</span>
            </div>
          </div>
        </div>
      </div>




      {/* Left  Cart */}
      <div className={headerLeftNavbar ? (" md:hidden fixed flex flex-col overflow-y-auto top-0 bottom-0 left-0 w-64 min-h-full bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all") : ("fixed top-0 -left-64 w-64 min-h-screen bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all")}>
        {/* LOGO */}
        <div className='flex items-center justify-between pb-5 mb-6 border-b border-b-gray-100 dark:border-b-white/10'>
          <div className='p-1 rounded-lg hover:bg-zinc-800/50 ' onClick={() => {
            setHeaderLeftNavbar(false)
          }}>
            <svg className="w-5 h-5 text-zinc-600 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className='text-orange-300 text-lg h-10 flex items-center'>
            سبد خرید
          </div>
        </div>

        {/* Cart */}
        <div>
          <div className='flex items-center justify-between font-DanaMedium text-xs tracking-tighter'>
            <span className='text-gray-300'>{(contextData.userCart.length)} مورد</span>
            <div className='flex items-center text-orange-300' onClick={() => clearCart()}>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>

          </div>
          <div className='pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5'>
            {
              contextData.userCart.map(product => (
                <div key={product.id} className='flex gap-x-2.5 items-center'>
                  <img src={`${DataUrl}/courses/covers/${product.cover}`} alt="p1" className='w-[65px] h-[65px]' />
                  <div className='flex flex-col justify-between w-full gap-y-3'>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-Dana text-zinc-700 dark:text-white text-sm line-clamp-2 leading-6	'>{product.name}</h4>
                      <button className='border  rounded-full p-px' onClick={() => {
                        removeProductFromCart(product)
                      }}>
                        <svg className="w-3 h-3 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    </div>
                    <div className='flex flex-col gap-y-4 mt-2'>
                      <div className='flex justify-between items-center gap-x-3 border p-1  text-orange-300 border-orange-300 rounded-full w-[60%]'>
                        <button onClick={() => {
                          addToCart(product)
                        }}>
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                            <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                          </svg>
                        </button>
                        <span>{product.count}</span>
                        <button onClick={() => {
                          removeProducts(product)
                        }}>
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                            <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                          </svg>
                        </button>
                      </div>
                      <div className='text-zinc-700 text-base dark:text-white font-DanaBold'>
                        {(product.price * product.count).toLocaleString()}
                        <span className='font-Dana text-xs mr-1'>
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>

        <div className='flex justify-between items-center gap-x-10 mt-auto mb-5'>
          {
            contextData.userCart.length ? (
              <>
                <div className='flex flex-col gap-y-3'>
                  <span className='font-DanaMedium text-gray-700 text-sm dark:text-white mt-4'>جمع كل سبد خريد:</span>
                </div>
                <div className='text-zinc-700 dark:text-white font-DanaBold text-xs  mt-4'>
                  {calculateTotalPrice().toLocaleString()}
                  <span className='font-Dana text-sm mr-1'>
                    تومان
                  </span>
                </div>

                {/* <div className='mt-5'>
                  <NavLink to="/cart" className='text-sm text-center flex items-center justify-center w-[90px] h-12  text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-700 transition-colors hover:bg-teal-700 rounded-xl tracking-tightest'>ثبت سفارش</NavLink>
                </div> */}
              </>
            ) : (
              <>
                <div className='w-full'>
                  <div className='text-zinc-700 dark:text-white font-DanaBold text-center '>
                    <span className='text-center'>
                      سبد خرید خالی است.
                    </span>
                  </div>
                </div>
              </>
            )
          }
        </div>


      </div>



      <div className={headerLeftNavbar || headerRightNavbar ? ("overlay md:hidden fixed inset-0 w-full h-full bg-black/40 z-10 transition-all") : ("transition-all")}
        onClick={() => {
          setHeaderLeftNavbar(false)
          setHeaderRightNavbar(false)
        }}
      ></div>
    </>
  )
}
