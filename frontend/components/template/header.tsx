import React, { useState } from "react";
import st from './template.module.css';

export default function Header({visible, setMenuVisible}: any){
    const hide = ()=>{
        setMenuVisible(false)
    };

    const show = ()=>{
        setMenuVisible(true)
    };

    return(
        <>
            <div className={[st.header].join(' ')}>
                <div className={[st.header_left, 'px-3'].join(' ')}>
                    {
                        (visible)?
                        <button
                            onClick={hide}
                        >
                            <svg 
                                version="1.0" 
                                xmlns="http://www.w3.org/2000/svg"
                                width="25px" height="25px" viewBox="0 0 60.000000 60.000000"
                                preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,60.000000) scale(0.100000,-0.100000)"
                                    fill="#FFFFFF" 
                                    stroke="none"
                                >
                                    <path d="M37 562 c-15 -16 -17 -50 -17 -264 0 -225 2 -246 18 -261 10 -10 33 -17 50 -17 l32 0 0 280 0 280 -33 0 c-20 0 -41 -8 -50 -18z"/>
                                    <path d="M160 300 l0 -280 194 0 c164 0 197 3 210 16 14 13 16 51 16 263 0 227 -2 249 -18 264 -16 15 -46 17 -210 17 l-192 0 0 -280z m170 85 c0 -24 2 -24 93 -27 l92 -3 0 -55 0 -55 -92 -3 c-91 -3 -93 -3 -93 -27 0 -37 -19 -30 -85 30 l-60 55 60 55 c66 60 85 67 85 30z"/>
                                </g>
                            </svg>
                        </button>
                        : 
                        <button
                            onClick={show}
                        >
                            <svg 
                                version="1.0" 
                                xmlns="http://www.w3.org/2000/svg"
                                width="25px" height="25px" viewBox="0 0 60.000000 60.000000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <g 
                                    transform="translate(0.000000,60.000000) scale(0.100000,-0.100000)"
                                    fill="#FFFFFF" 
                                    stroke="none"
                                >
                                    <path d="M37 562 c-15 -16 -17 -50 -17 -264 0 -225 2 -246 18 -261 10 -10 33 -17 50 -17 l32 0 0 280 0 280 -33 0 c-20 0 -41 -8 -50 -18z"/>
                                    <path d="M160 300 l0 -280 194 0 c164 0 197 3 210 16 14 13 16 51 16 263 0 227 -2 249 -18 264 -16 15 -46 17 -210 17 l-192 0 0 -280z m305 55 l60 -55 -60 -55 c-66 -60 -85 -67 -85 -30 0 24 -2 24 -92 27 l-93 3 0 55 0 55 93 3 c90 3 92 3 92 27 0 37 19 30 85 -30z"/>
                                </g>
                            </svg>
                        </button>
                    }
                </div>
                <div className={[st.header_rigth].join(' ')}></div>
            </div>
        </>
    );
}