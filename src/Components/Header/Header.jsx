import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrlV1 } from "../../Data/Data"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/authContext'
import swal from 'sweetalert'
export default function Header() {
  const [headerLink, setHeaderLink] = useState([])
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const [headerRightNavbar, setHeaderRightNavbar] = useState(false)
  const [headerLeftNavbar, setHeaderLeftNavbar] = useState(false)
  const [sidemenu, setSidemenu] = useState(false)

  const clearCart = () => {
    console.log("first")
  }


  useEffect(() => {
    fetch(`${DataUrlV1}/menus`)
      .then(res => res.json())
      .then(data => setHeaderLink(data))

  }, [])
  return (
    <>
      <header className='fixed top-9 right-0 left-0 hidden md:flex items-center px-5 lg:px-10 rounded-3xl w-[98%] lg:w-[90%] h-24 mx-auto bg-black/50 backdrop-blur-[6px] z-50'>
        <div className='flex items-center w-full justify-between'>
          {/* logo & Menu */}
          <nav className='flex items-center gap-x-5 lg:gap-x-9 h-14'>
            {/* logo */}
            <div className='flex-shrink-0'>
              <NavLink to="/">
                <img src="/images/app-logo.png" width="70px" alt="Golden Coffee" />
              </NavLink>
            </div>
            {/* Menu */}
            <ul className='flex gap-x-5 xl:gap-x-9 h-full text-xl text-gray-300 tracking-tightest child:leading-[56px] child-hover:text-orange-300 transition-colors '>
              <li className='font-DanaMedium' >
                <NavLink className={({ isActive }) => (isActive) ? ("text-orange-200") : ("")} to="/">صفحه اصلی</NavLink>
              </li>
              <li className='font-DanaMedium'>
                <ul>
                  <div className='relative group'>
                    <NavLink to="/shop" className={({ isActive }) => (isActive) ? (" text-orange-200") : ("")}>فروشگاه</NavLink>
                    {
                      (headerLink.length) ? (
                        <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full flex flex-col p-6 w-52 text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all  child:transition-colors child-hover:text-orange-300'>
                          {
                            headerLink.map(menu => (
                              <div key={menu._id} className='flex justify-between items-center '>
                                <NavLink to={`/category/${menu.href}`}>
                                  {menu.title}
                                </NavLink>

                              </div>
                            ))
                          }
                        </div>
                      ) : (
                        <>
                        </>
                      )
                    }
                  </div>
                </ul>
              </li>
              {/* <li className='font-DanaMedium'>
                <NavLink to="/articles" className={({ isActive }) => (isActive) ? ("text-orange-200") : ("")}>مقالات</NavLink>
              </li> */}
              <li className='font-DanaMedium'>
                <NavLink to="/about-us" className={({ isActive }) => (isActive) ? ("text-orange-200") : ("")}>درباره ما</NavLink>
              </li>
              {/* <li className='font-DanaMedium'>
                <NavLink to="/contact-us" className={({ isActive }) => (isActive) ? ("text-orange-200") : ("")}>تماس باما</NavLink>
              </li> */}
            </ul>
          </nav>

          {/* Cart & Login */}
          <div className='flex text-orange-200 text-xl gap-x-4 lg:gap-x-5 xl:gap-x-10'>
            {/* Cart and darkmode */}
            <div className='flex items-center gap-x-4'>
              {/* Cart */}
              <div className='relative group'>
                <div className='py-3 '>
                  <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>
                {/*  */}
                <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 p-5  w-[400px] text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all'>
                  <div className='flex items-center justify-between font-DanaMedium text-xs tracking-tighter'>
                    <span className='text-gray-300'>1 مورد</span>
                    <a href="#" className='flex items-center text-orange-300'>
                      مشاهده سبد خرید
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </a>

                  </div>
                  <div className='pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5'>
                    <div className='flex gap-x-2.5'>
                      <img src="/images/products/p1.png" alt="p1" className='w-[120px] h-[120px]' />
                      <div className='flex flex-col justify-between'>
                        <h4 className='font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2'>قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی</h4>
                        <div>
                          <span className='text-teal-600 dark:text-emerald-500 text-xs tracking-tighter'>
                            14.500 تومان تخفیف
                          </span>
                          <div className='text-zinc-700 dark:text-white font-DanaBold'>
                            175,000
                            <span className='font-Dana text-sm mr-1'>
                              تومان
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-x-2.5'>
                      <img src="/images/products/p1.png" alt="p1" className='w-[120px] h-[120px]' />
                      <div className='flex flex-col justify-between'>
                        <h4 className='font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2'>قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی</h4>
                        <div>
                          <span className='text-teal-600 dark:text-emerald-500 text-xs tracking-tighter'>
                            14.500 تومان تخفیف
                          </span>
                          <div className='text-zinc-700 dark:text-white font-DanaBold'>
                            175,000
                            <span className='font-Dana text-sm mr-1'>
                              تومان
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between mt-5'>
                    <div>
                      <span className='font-DanaMedium text-gray-300 text-xs tracking-tighter'>مبلغ قابل پرداخت</span>
                      <div className='text-zinc-700 dark:text-white font-DanaBold '>
                        175,500
                        <span className='font-Dana text-sm mr-1'>
                          تومان
                        </span>
                      </div>
                    </div>
                    <a href="#" className='flex text-lg items-center justify-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-700 transition-colors hover:bg-teal-700 rounded-xl tracking-tightest'>ثبت سفارش</a>
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

            <span className='block w-px h-14 bg-white/20'></span>

            {/* Login */}
            {
              auth.isLoggedIn ? (
                <>
                  <NavLink to="/my-account/dashboard" className='hidden xl:flex items-center gap-x-2.5 tracking-tightest '>
                    <span className='text-xl  tracking-normal'>
                      {auth.userInfos.name}
                    </span>
                  </NavLink>

                  <NavLink to="/my-account/dashboard" className='flex xl:hidden items-center gap-x-2.5 tracking-tightest'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 border rounded-full p-[2px]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className='items-center gap-x-2.5 tracking-tightest flex'>
                    <svg className="w-8 h-8 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span className='text-xl tracking-normal hidden xl:flex'>
                      ورود | ثبت‌نام
                    </span>
                  </NavLink>
                </>
              )
            }
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


        <NavLink to="/" className='w-[100px] h-10 text-orange-300'>

        </NavLink>

        <div className='p-1 rounded-lg hover:bg-zinc-800/50 ' onClick={() => {
          setHeaderLeftNavbar(true)
        }}>
          <svg className="w-6 h-6 text-zinc-700 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>


      </div>


      {/* Right Navbar */}
      <div className={headerRightNavbar ? ("block md:hidden  fixed overflow-y-auto top-0 bottom-0 right-0 w-64 min-h-screen bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all") : ("fixed top-0 -right-64 w-64 min-h-screen bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all")}>
        {/* LOGO */}
        <div className='flex items-center justify-between pb-5 mb-6 border-b border-b-gray-100 dark:border-b-white/10'>
          <div className='text-orange-300'>
            {/* <svg className='w-[41px] h-10' viewBox="0 0 41 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0569 0.00102901C15.8613 0.0126934 15.8027 0.0176935 15.674 0.0343571C15.4845 0.0585203 15.2824 0.0993471 15.1012 0.150173C15.022 0.172669 14.8408 0.233077 14.842 0.236826C14.8429 0.238493 14.8867 0.269738 14.94 0.305983C15.7966 0.89131 16.5075 1.62953 17.0643 2.51065C17.5801 3.32635 17.984 4.26329 18.353 5.50019C18.5023 6.00053 18.6191 6.43713 18.8655 7.41823C19.1456 8.53264 19.2612 8.96383 19.4277 9.51374C19.4834 9.69663 19.6007 10.0578 19.6548 10.2116C19.7635 10.5215 19.9078 10.8923 20.0128 11.1302L20.023 11.1531L20.0275 11.1364C20.03 11.1272 20.0439 11.0718 20.0587 11.0131C20.2415 10.2732 20.2645 9.49458 20.13 8.56389C20.0693 8.14145 19.9984 7.78817 19.8004 6.91414C19.6778 6.37339 19.6511 6.25216 19.5991 5.99345C19.4437 5.22565 19.376 4.60574 19.3863 4.04999C19.3879 3.96042 19.3904 3.87252 19.3916 3.85461L19.3945 3.82128L20.2961 6.97288C20.7918 8.70595 21.1981 10.1249 21.1989 10.1257C21.2002 10.127 25.9764 7.36574 25.9826 7.36032C25.9863 7.35657 25.8243 7.02621 25.7558 6.89748C24.6566 4.83487 22.6098 2.71936 20.4207 1.38332C19.294 0.695506 18.1833 0.249741 17.1681 0.0781002C16.9676 0.0439386 16.7859 0.0226927 16.5633 0.00644493C16.503 0.00227833 16.109 -0.00188732 16.0569 0.00102901Z" />
              <path d="M12.3077 2.06948C11.9386 2.09322 11.5717 2.22154 11.2437 2.44192C10.7783 2.75479 10.3908 3.2593 10.1219 3.90336C10.0218 4.14291 9.89143 4.53618 9.80041 4.87488C9.59991 5.62018 9.46256 6.43839 9.35595 7.52448C9.31823 7.90692 9.29363 8.19979 9.23254 8.99509C9.17186 9.78621 9.13741 10.182 9.09682 10.5678C9.08575 10.6723 9.08124 10.7327 9.08247 10.7498C9.09108 10.839 9.15545 10.9469 9.2883 11.0948C9.3129 11.1223 9.40228 11.216 9.48675 11.3031C9.65198 11.473 9.72497 11.5522 9.79385 11.6338C9.81763 11.6626 9.84141 11.6905 9.84633 11.6963C9.85494 11.7063 9.85535 11.7068 9.85576 11.6988C9.85576 11.6938 9.97467 10.404 10.1202 8.83261C10.2658 7.26077 10.4081 5.72142 10.4368 5.4123C10.465 5.10276 10.4888 4.84947 10.4888 4.84947C10.4892 4.84905 10.5639 4.86072 10.6553 4.8753C10.7467 4.88988 10.8218 4.90196 10.8222 4.90196C10.823 4.90196 10.8238 6.35632 10.8242 8.13355L10.8254 11.3656L11.8136 11.6247C16.4259 12.8357 17.6592 13.1594 17.6604 13.1582C17.6608 13.1574 17.6403 13.052 17.6153 12.9237C17.5899 12.7953 17.5366 12.5133 17.4964 12.2967C17.334 11.4147 17.2844 11.161 17.2008 10.7931C17.1262 10.4649 17.0716 10.2557 16.9654 9.89495C16.8441 9.48168 16.7846 9.27129 16.5124 8.28478C16.1151 6.84541 15.8797 6.09178 15.5857 5.32065C15.343 4.68283 15.0347 4.01876 14.8055 3.63965C14.5714 3.25263 14.2848 2.9131 13.9797 2.66189C13.4664 2.23903 12.8845 2.03282 12.3077 2.06948Z" />
              <path d="M32.5251 8.19719C31.3365 8.23593 30.0941 8.43799 28.8083 8.80126C26.1625 9.54907 23.6544 10.8889 21.9081 12.4878C21.7072 12.6715 21.3747 13.0035 21.2156 13.1789C20.7806 13.6584 20.4489 14.1021 20.1619 14.5879C20.1447 14.6166 20.1315 14.6404 20.1324 14.6412C20.1328 14.642 20.1574 14.6404 20.1861 14.6379C20.6736 14.5954 21.1357 14.4437 21.6802 14.1471C22.1849 13.8726 22.8778 13.4789 24.007 12.8244C24.9312 12.2891 25.2276 12.1183 25.604 11.9041C27.2474 10.9693 28.468 10.3423 29.6283 9.83652C30.4352 9.48491 31.1897 9.30285 32.0556 9.25119C32.2619 9.2387 32.6329 9.24161 32.8675 9.25786C33.7814 9.31993 34.6846 9.56073 35.5777 9.98025C35.6273 10.0036 35.6691 10.024 35.6707 10.0252C35.6724 10.0269 35.51 10.0273 35.3099 10.0269C34.1139 10.0223 33.006 10.0886 31.8793 10.2327C28.32 10.6872 25.2699 11.8904 23.1562 13.673C22.8934 13.8947 22.7015 14.0717 22.46 14.315C22.23 14.5462 22.0627 14.7295 21.8667 14.9649C21.772 15.0786 21.5428 15.3728 21.5145 15.4173L21.508 15.4282L21.5559 15.4652C21.6322 15.5236 21.804 15.6644 21.9139 15.7581C22.2079 16.0081 22.4506 16.2301 23.0312 16.7792C23.7553 17.4641 24.0595 17.7366 24.4314 18.0336C25.2166 18.6606 25.8808 18.9864 26.5163 19.0555C26.6738 19.0726 26.9517 19.0751 27.1149 19.0605C27.807 18.9985 28.5561 18.7468 29.493 18.2627C29.8784 18.0636 30.2462 17.8557 30.8666 17.4874C31.0043 17.4058 31.2208 17.2771 31.3483 17.2012C31.915 16.8646 32.1491 16.7317 32.6173 16.4813C33.9782 15.7531 34.7117 15.3165 35.4046 14.822C35.8897 14.4754 36.2673 14.1638 36.6535 13.7905C37.1952 13.2668 37.5498 12.7352 37.7364 12.1674C37.8073 11.952 37.845 11.775 37.8676 11.5467C37.875 11.4759 37.8774 11.2576 37.8721 11.178C37.85 10.851 37.7725 10.5589 37.6298 10.2656C37.4527 9.9011 37.1915 9.57906 36.8426 9.29494C36.1808 8.75585 35.2689 8.41424 34.0967 8.26635C33.856 8.23593 33.6215 8.21635 33.3062 8.20094C33.1926 8.19552 32.6579 8.19302 32.5251 8.19719Z" />
              <path d="M40.4392 12.7135C40.3539 12.9144 40.285 13.0668 40.203 13.2368C39.5638 14.5612 38.6827 15.6723 37.5252 16.6134C36.6568 17.3195 35.6469 17.9344 34.2783 18.5902C33.7473 18.8447 33.3295 19.0326 32.1483 19.5475C30.8297 20.1224 30.3155 20.359 29.6513 20.6961C29.0912 20.9802 28.641 21.2331 28.1937 21.5139C28.1395 21.5476 28.0944 21.5759 28.094 21.5768C28.0932 21.5772 28.1059 21.5943 28.1227 21.6147C28.1621 21.6626 28.2318 21.7543 28.3355 21.893C28.4905 22.1013 28.5516 22.1671 28.5828 22.1604C28.5951 22.1579 29.0994 21.9542 30.1474 21.528C31.8715 20.8273 33.1253 20.312 36.2751 19.0093C36.9541 18.7285 37.5113 18.4981 37.5133 18.4972C37.517 18.4956 37.6298 18.6922 37.6335 18.706C37.6343 18.7101 36.7433 19.1671 31.1712 22.0205C30.1568 22.54 29.3261 22.9657 29.3249 22.9666C29.3241 22.9678 29.6628 23.8552 30.0773 24.9388C30.4918 26.0223 31.0384 27.4505 31.2913 28.1129C31.5447 28.7748 31.7534 29.3185 31.7551 29.3206C31.7596 29.326 31.8116 29.3014 32.0335 29.1894C32.5345 28.9365 32.974 28.6782 33.4624 28.3503C35.2135 27.1751 36.8577 25.5112 38.1734 23.5823C39.8275 21.1573 40.8353 18.496 40.9821 16.1668C40.9948 15.9656 40.9968 15.8989 40.9993 15.6564C41.0026 15.3077 40.9927 15.0624 40.9632 14.7545C40.8992 14.0896 40.7533 13.4626 40.5298 12.8923C40.4933 12.7998 40.4523 12.7006 40.449 12.6969C40.4478 12.6961 40.4437 12.7036 40.4392 12.7135Z" />
              <path d="M8.4373 13.6302C8.0855 13.641 7.72961 13.6685 7.39135 13.711C5.44582 13.9568 3.7463 14.738 2.2682 16.0653C2.07713 16.2369 1.83891 16.4669 1.68762 16.626L1.59741 16.721H1.63554C1.73149 16.721 2.14724 16.7335 2.39366 16.7439C3.99436 16.8118 4.97635 17.0147 5.9936 17.488C6.11743 17.5455 6.39378 17.6863 6.52047 17.7567C6.97682 18.0095 7.44998 18.3124 8.05188 18.7369C9.83586 19.9955 10.7457 20.7141 11.6293 21.5636C11.783 21.7115 12.455 22.3985 12.9905 22.9555C13.5592 23.547 14.0152 24.0278 14.9996 25.0739C15.0697 25.1485 15.4248 25.5271 15.7889 25.9154C17.6356 27.8855 18.3314 28.6192 19.2765 29.5919C20.1006 30.4397 21.2392 31.5758 21.632 31.942C22.6255 32.8677 23.9023 33.6563 25.2254 34.1612C25.6227 34.3129 26.0536 34.4475 26.307 34.4995C26.7092 34.5816 27.0885 34.5874 27.4415 34.5179C28.0996 34.3875 28.6334 33.9967 28.9709 33.3972C29.1652 33.0518 29.2927 32.6269 29.3374 32.1749C29.3534 32.0132 29.3543 31.992 29.3538 31.6333C29.3538 31.2171 29.3456 30.9263 29.3235 30.5147C29.2382 28.9512 28.9807 27.7001 28.5383 26.6966C28.4141 26.4149 28.0943 25.7842 27.8339 25.3072C26.5087 22.8801 24.8884 20.8129 22.9867 19.1248C21.3815 17.6996 19.5795 16.5431 17.5806 15.6557C15.574 14.7646 13.3714 14.1464 10.9814 13.8031C10.2291 13.6948 9.71901 13.6477 9.11587 13.6298C8.9572 13.6252 8.59843 13.6252 8.4373 13.6302ZM10.4382 15.0921C10.9101 15.1083 11.3611 15.1496 11.8343 15.2196C13.8466 15.5174 16.0123 16.3106 18.1608 17.5367C21.0318 19.1752 23.6784 21.4915 25.5046 23.9636C26.7236 25.6138 27.5297 27.2656 27.8634 28.7983C28.0643 29.7207 28.0926 30.5972 27.9479 31.4004C27.929 31.5041 27.902 31.6354 27.8987 31.6391C27.8975 31.64 27.8966 31.6337 27.8966 31.6245C27.8966 31.5737 27.8798 31.3108 27.8675 31.175C27.7589 29.9465 27.4091 28.675 26.8265 27.3902C25.553 24.5815 23.2262 21.844 20.2663 19.6722C19.0588 18.7861 17.7492 18.0012 16.4154 17.3642C13.9245 16.1748 11.3488 15.4799 8.82886 15.317C8.60499 15.3029 8.27575 15.2879 8.17899 15.2879C8.14905 15.2879 8.12978 15.2862 8.13183 15.2841C8.13675 15.2795 8.3188 15.2446 8.46641 15.2191C8.86658 15.1512 9.30448 15.1075 9.7309 15.0925C9.86907 15.0875 10.3029 15.0875 10.4382 15.0921Z" />
              <path d="M2.23171 19.8562C1.47605 19.8971 0.892187 20.187 0.504722 20.7149C0.421079 20.829 0.356296 20.9382 0.289874 21.0765C0.131608 21.4085 0.0418141 21.7772 0.0073728 22.2388C-7.48572e-06 22.3334 -0.00246758 22.6391 0.00286262 22.7512C0.0717453 24.2039 0.370647 25.6129 0.851595 26.7493C0.962299 27.0114 1.16854 27.4351 1.39856 27.8733C2.33708 29.6622 3.44699 31.267 4.72624 32.6851C5.0805 33.078 5.54136 33.5491 5.9239 33.9103C7.55043 35.4447 9.40944 36.7128 11.4899 37.7081C13.2004 38.5263 15.055 39.16 17.0677 39.6136C17.8504 39.7899 18.5942 39.9053 19.3109 39.9611C19.7131 39.9923 20.0231 40.0027 20.4303 39.9994C20.7029 39.9969 20.7878 39.9944 21.0063 39.9819C22.2925 39.9082 23.4968 39.6207 24.6247 39.1187C24.9158 38.9891 25.2586 38.8146 25.5411 38.6517C25.9884 38.3947 26.4718 38.0668 26.8581 37.7585L26.8917 37.7314L26.69 37.7289C26.3037 37.7239 25.9868 37.6998 25.6334 37.6485C23.9982 37.4123 22.484 36.6632 20.9694 35.3414C20.6045 35.0227 20.2724 34.7031 19.8202 34.2349C19.3548 33.7533 19.0137 33.3842 18.1608 32.4393C16.9874 31.1395 16.6343 30.7646 15.8524 29.988C13.9676 28.1162 13.5096 27.6625 12.8532 27.0172C10.8014 24.9992 9.19747 23.4865 7.67877 22.1384C7.38848 21.8805 7.25727 21.7655 7.18265 21.7035C6.61683 21.2319 5.90914 20.8278 5.06697 20.4945C4.61349 20.3149 4.07719 20.1458 3.58066 20.025C3.17515 19.9266 2.95785 19.8879 2.67043 19.8641C2.59662 19.8579 2.30059 19.8525 2.23171 19.8562ZM2.25631 21.0431C2.47649 21.1127 2.71676 21.1769 3.17269 21.2889C3.80043 21.4427 4.10507 21.5306 4.39864 21.6418C4.75167 21.7759 4.99808 21.9093 5.26582 22.1109C8.03015 24.1939 9.97527 25.8187 11.6067 27.4084C12.2152 28.0017 13.1799 28.9907 14.0303 29.8939C15.0894 31.0187 15.9394 31.9502 17.9927 34.2349C19.1928 35.5701 19.7779 36.2175 20.336 36.8274C20.4339 36.9349 20.5147 37.024 20.5155 37.0257C20.5164 37.0282 20.3458 37.1998 20.1264 37.4169L20.083 37.4598L19.8005 37.1523C19.2572 36.5616 18.8685 36.1358 17.8246 34.991C15.866 32.843 15.0062 31.9086 14.0156 30.8521C12.7867 29.5414 11.5485 28.2616 10.6145 27.3355C9.27332 26.0061 8.106 24.9521 6.96739 24.0427C6.73286 23.8552 6.51432 23.6952 6.23141 23.5036C5.76686 23.1891 5.37735 22.9528 4.38429 22.3846C3.53351 21.8976 3.14809 21.6676 2.71963 21.391C2.55111 21.2819 2.18579 21.0348 2.17021 21.0194C2.16529 21.0144 2.15955 21.0127 2.25631 21.0431Z" />
            </svg> */}


            <svg className='w-7 h-7 text-white fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
              aria-describedby="desc" role="img" xmlns: xlink="http://www.w3.org/1999/xlink"
              width="64" height="64">
              <title></title>
              <desc></desc>
              <path data-name="layer2"
                d="M52.5 15.5c0-5.5-3.6-13.7-8-13.7s-8 8.1-8 13.7 2.5 8.1 6 9l-1 33.5c0 3.2 1.9 4 3 4s3.2-.6 3-4l-1-33.5c3.4-.9 6-4.3 6-9z"
                fill="currentColor" stroke="#202020" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
              <path data-name="layer1" d="M24.5 2.1h-12l-1 20c0 3.2 2.1 5.2 5 5.8v32.2a2 2 0 0 0 4 0V27.9c2.9-.6 5-2.6 5-5.8z"
                fill="currentColor" stroke="#202020" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
            </svg>
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
            <li>
              <div className='flex items-center justify-between'>
                <NavLink to="/shop" className={({ isActive }) => (isActive || sidemenu) ? ("flex items-center gap-x-2 pr-2 h-10 text-orange-300") : ("flex items-center gap-x-2 pr-2 h-10")}>
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  فروشگاه
                </NavLink>
                <span onClick={() => {
                  setSidemenu(!sidemenu)
                }}>
                  <svg className={sidemenu ? ("w-4 h-4 transition-all") : ("w-4 h-4 rotate-90 transition-all")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </div>
              <div className={(sidemenu) ? ("sidemenu sidemenu--open transition-all") : ("sidemenu  transition-all")}>
                {
                  headerLink.length ? (
                    <>
                      {
                        headerLink.map(link => (
                          <NavLink key={link._id} to={`/category/${link.href}`} className={({ isActive }) => (isActive) ? ("submenu--active") : ("")}>{link.title}</NavLink>
                        ))
                      }
                    </>
                  ) : (
                    <>

                    </>
                  )
                }
              </div>
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
            {/* <li>
              <NavLink to="/contact-us" className={({ isActive }) => (isActive) ? ("flex items-center bg-orange-200/20 text-orange-300 mb-4 h-10 rounded-md gap-x-2 pr-2") : ("flex items-center mb-4 h-10  rounded-md gap-x-2 pr-2")} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                تماس با ما
              </NavLink>
            </li> */}
          </ul>
        </div>
        {/* Info */}
        <div className='space-y-6 px-2.5 py-5 mt-6 border-t border-t-gray-100 dark:border-t-white/10'>
          <div>
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
          </div>
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
          <div>
            {
              auth.isLoggedIn ? (
                <>
                  <div className="flex items-center gap-x-2.5 tracking-tightest text-orange-300" onClick={() => {
                    swal({
                      title: "آیا از اکانت خود خارج می شوید؟",
                      buttons: ["خیر", "بله"]
                    }).then((res) => {
                      if (res) {
                        auth.logout()
                        navigate("/")
                      }
                    })
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span className='text-base tracking-normal'>
                      خارج می شوید؟
                    </span>
                  </div>
                </>
              ) : (
                <>
                </>
              )
            }
          </div>
        </div>
      </div>




      {/* Left  Cart */}
      <div className={headerLeftNavbar ? (" md:hidden fixed flex flex-col overflow-y-auto top-0 bottom-0 left-0 w-64 min-h-screen bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all") : ("fixed top-0 -left-64 w-64 min-h-screen bg-white dark:bg-zinc-700 pt-3 px-4 z-20 transition-all")}>
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
            <span className='text-gray-300'>1 مورد</span>
            <div className='flex items-center text-orange-300' onClick={() => clearCart()}>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>

          </div>
          <div className='pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5'>
            <div className='flex gap-x-2.5'>
              <img src="/images/products/p1.png" alt="p1" className='w-[75px] h-[75px]' />
              <div className='flex flex-col justify-between'>
                <h4 className='font-DanaMedium text-zinc-700 dark:text-white text-xs line-clamp-2 leading-6	'>قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی</h4>
                <div className='flex flex-col gap-y-2 mt-2'>
                  <span className='text-teal-600 dark:text-emerald-500 text-xs tracking-tighter'>
                    14.500 تومان تخفیف
                  </span>
                  <div className='text-zinc-700 text-base dark:text-white font-DanaBold'>
                    175,000
                    <span className='font-Dana text-xs mr-1'>
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-x-2.5'>
              <img src="/images/products/p1.png" alt="p1" className='w-[75px] h-[75px]' />
              <div className='flex flex-col justify-between'>
                <h4 className='font-DanaMedium text-zinc-700 dark:text-white text-xs line-clamp-2 leading-6	'>قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی</h4>
                <div className='flex flex-col gap-y-2 mt-2'>
                  <span className='text-teal-600 dark:text-emerald-500 text-xs tracking-tighter'>
                    14.500 تومان تخفیف
                  </span>
                  <div className='text-zinc-700 text-base dark:text-white font-DanaBold'>
                    175,000
                    <span className='font-Dana text-xs mr-1'>
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center gap-x-10 mt-auto mb-4'>
          <div className='flex flex-col gap-y-3 '>
            <span className='font-DanaMedium text-gray-300 text-xs '>مبلغ قابل پرداخت</span>
            <div className='text-zinc-700 dark:text-white font-DanaBold text-xs '>
              175,500
              <span className='font-Dana text-sm mr-1'>
                تومان
              </span>
            </div>
          </div>

          <div>
            <NavLink to="/cart" className='text-sm text-center flex items-center justify-center w-[90px] h-12  text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-700 transition-colors hover:bg-teal-700 rounded-xl tracking-tightest'>ثبت سفارش</NavLink>
          </div>
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