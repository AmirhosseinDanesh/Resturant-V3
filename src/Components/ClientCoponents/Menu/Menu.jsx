import React, { useEffect, useState, useContext } from "react";
import "./Menu.css"
import { DataUrl } from "../../../Data/Data"

const Menu = ({ allProducts }) => {
  const sortedProducts = (allProducts.sort((a, b) => a.shortName - b.shortName))

  return (

    <div className="section-center grid grid-cols-1 sm:grid-cols-2">
      {
        sortedProducts.map(pr => {
          return (
            <div key={pr._id} className="product-section flex justify-around">
              <div className="prsc-img ">
                <img className="pr-img rounded-xl w-[100px] sm:w-[150px]" src={`${DataUrl}/courses/covers/${pr.cover}`} alt="" />
              </div>
              <div className="prsc-info">
                <div className="prsc-title font-DanaBold dark:text-white">{pr.name}</div>
                <div className="prsc-desc font-DanaMedium dark:text-gray-300">{pr.description}</div>
                <div className="prsc-price text-orange-800 dark:text-orange-300">
                  <div className="prsc-price__number">{pr.price.toLocaleString()} </div>
                  <div className="prsc-price__toman"> تومان </div>
                </div>
                <div className="mt-3">
                  {/* <button className="btn btn-primary btn-sm d-flex justify-content-between gap-2" onClick={()=>addToCart()}>
                    سفارش
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ width: "1.5rem" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </button> */}
                </div>
                <div className="prsc-stk">
                  <span className="prsc-stk-text">
                    {
                      pr.status === "presell" ? ("تمام شد") : (" ")
                    }
                  </span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Menu;

