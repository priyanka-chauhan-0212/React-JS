import React from 'react'
import panel from "./Assests/panelimg.jpg"
import building from "./Assests/buildingsimg.jpg"
import house from "./Assests/colors3.353e2d46.jpg"
import box from "./Assests/colors4.c2d19c01.jpg"
import bems from "./Assests/colors5.4e08344d.jpg"
import mobile from "./Assests/colors6.d25cf908.jpg"
import "./layout1.css";

export default function Layout1() {
    return (
        <>
        <div className='mainpage'>
        <div className='layout-first'>
            <div className='firstlayout-left'>
                <div className='uprpotion'>
                    <img src={panel} alt='' className='firstimg' />
                </div>
                <div className='lowerportion'>
                    <div className='first-button'>
                        <div className='btnblue'>
                            <button className='blue'></button>
                        </div>
                        <span className='bluetext'>
                            Sierra Blue
                        </span>
                    </div>
                    <div className='first-button'>
                        <div className='btnsilver'>
                            <button className='silver'></button>

                        </div>
                        <span className='silvertext'>
                            Silver
                        </span>
                    </div>
                    <div className='first-button'>
                        <div className='btngold'>
                            <button className='gold'></button>

                        </div>
                        <span className='goldtext'>
                            Gold
                        </span>
                    </div>
                </div>
            </div>

            <div className='firstlayout-right'>
                <img src={building} alt='' className='secondimg' />
            </div>
        </div>
         <div className='layout-second'>
            {/* second-part */}
         <div className='secondlayout-left'>
             <img src={house} alt="" className='houseimg' />
         </div>
         <div className='secondlayout-right'>
             <img src={box} alt="" className='boximg' />
         </div>
     </div>
     {/* third-part */}
     <div className='layout-third'>
         <div className='thirdlayout-left'>
             <img src={bems} alt="" className='bemsimg' />
         </div>
         <div className='thirdlayout-right'>
             <img src={mobile} alt="" className='mobileimg' />
         </div>
     </div>
     </div>
     </>
    )
}
