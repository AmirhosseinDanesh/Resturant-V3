import React, { useEffect, useState } from 'react'
import { DataUrlV1 } from '../../../Data/Data'

export default function ProductSection() {
  const [allCourses, setAllCourses] = useState([])

  useEffect(() => {
    fetch(`${DataUrlV1}/courses`)
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])
  return (
    <div className="section-center d-flex flex-row flex-wrap align-items-center justify-content-around">
      {allCourses.map(pr => (
        <div key={pr._id} className="product-section col-12 col-md-5 align-items-center ">
          <div className="prsc-img col-5 col-md-5 ">
            <img className="pr-img" src={pr.cover} alt="" />
          </div>
          <div className="prsc-info col-5 col-md-6 ">
            <div className="prsc-title">{pr.name}</div>
            <div className="prsc-desc">{pr.description}</div>
            <div className="prsc-price">
              <div className="prsc-price__number">{pr.price.toLocaleString()}</div>
              <div className="prsc-price__toman">تومان</div>
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}
