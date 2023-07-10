import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Slider from '../../Components/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
import { NavLink } from 'react-router-dom'
import { DataUrlV1 } from '../../Data/Data'
import ProductCart from "../../Components/ProductCart/ProductCart"

import Categories from "../../Components/ClientCoponents/Categories/Categories"
import ProductSection from "../../Components/ClientCoponents/ProductSection/ProductSection"
import Menu from "../../Components/ClientCoponents/Menu/Menu"

export default function Index() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    fetch(`${DataUrlV1}/courses/`)
      .then(res => res.json())
      .then(products => {
        setAllProducts(products);
        setFilterProducts(products);
      });

    fetch(`${DataUrlV1}/category/`)
      .then(res => res.json())
      .then(categories => {
        setAllCategories(categories);
      });
  }, []);

  const filterCategory = (category) => {
    let filteringCategory = allProducts.filter(pr => pr.categoryID.title === category);
    setFilterProducts(filteringCategory);
  }
  const resetFilter = () => {
    setFilterProducts(allProducts);
  };
  return (
    <>
      <Header />
      <main className='container mt-5 md:mt-36'>
        <div className="title text-center pt-5">
          <h1 className='text-3xl md:text-5xl mb-10 font-MorabbaBold dark:text-white'>رستوران مدیران</h1>
        </div>
        <section className="menu section my-5">
          <Categories
            allCategory={allCategories}
            filterCategory={filterCategory}
            resetFilter={resetFilter} // pass resetFilter as prop
          />
          <Menu allProducts={filterProducts} />
        </section>
      </main>
    </>
  )
}
