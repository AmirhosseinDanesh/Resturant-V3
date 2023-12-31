import React, { Children, useRef, useState } from "react";
import { Swiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Slider({ children }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper pt-14 sm:pt-0"
      >
        {children}
      </Swiper>
    </>
  );
}
