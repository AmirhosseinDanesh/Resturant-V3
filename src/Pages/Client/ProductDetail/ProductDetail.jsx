import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'

import { NavLink, useParams } from 'react-router-dom'
import { DataUrl, DataUrlV1 } from '../../../Data/Data'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { commentvalue } from "../../../Components/Input/Validate"

import AuthContext from '../../../Context/authContext'
import DOMPurify from 'dompurify'
import swal from 'sweetalert';

import ProductsContext from '../../../Context/ProductsContext'

export default function ProductDetail() {
  const contextData = useContext(ProductsContext)

  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [productDetail, setProductDetail] = useState([])
  const { shortName } = useParams()
  const auth = useContext(AuthContext)
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

  useEffect(() => {
    fetch(`${DataUrlV1}/courses/${shortName}`)
      .then(res => res.json())
      .then(data => {
        setProductDetail(data)
      })
  }, [])
  return (
    <>
      <Header />
      <div className='md:mt-40 container py-10 flex flex-col-reverse md:flex-row justify-around items-center md:gap-x-10'>
        <div className='w-full md:w-1/2 text-gray-950 dark:text-white flex flex-col gap-y-5 mt-16 md:mt-0'>
          <NavLink className="text-base  md:text-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white" to="/">
            صفحه اصلی
          </NavLink>
          <div className='flex flex-col'>
            <h1 className='text-2xl/9 font-MorabbaMedium'>{productDetail.name}</h1>
            <span className='flex items-center justify-center md:justify-end gap-x-5 my-10'>{
              (productDetail.price) ? (
                (productDetail.discount !== 0) ? (
                  <>
                    <div className='text-gray-700 dark:text-white'>
                      <span className='font-DanaMedium text-3xl md:text-2xl'>{(productDetail.price - ((productDetail.discount * productDetail.price) / 100)).toLocaleString()}</span>
                      <span className='text-base tracking-tighter mr-0.5'>تومان</span>
                    </div>
                    <div className='offer text-gray-400/90 flex justify-center items-center'>
                      <span className='text-base md:text-lg'>{productDetail.price.toLocaleString()}</span>
                      <span className='hidden xl:inline text-sm tracking-tighter mr-0.5'>تومان</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className='text-xl md:text-2xl'>{productDetail.price.toLocaleString()}</span>
                    <span className='text-xs tracking-tighter mr-0.5'>تومان</span>
                  </>

                )
              ) : (
                <>
                </>
              )
            }
            </span>
          </div>
          <p className='text-sm md:text-base leading-7 md:leading-9 font-DanaMedium tracking-wide text-gray-700 dark:text-gray-100' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }}>

          </p>
          <div>
            <button className='input-submit bg-blue-600' onClick={() => {
              addToCart(productDetail)
            }}>
              اضافه کردن به سبد خرید
            </button>
          </div>
        </div>
        <div className='w-full md:w-1/2 mt-10'>
          <img loading='lazy' className='w-65 mx-auto md:w-auto rounded-lg' src={`${DataUrl}/courses/covers/${productDetail.cover}`} alt="" />
        </div>
      </div >
    </>

  )
}
