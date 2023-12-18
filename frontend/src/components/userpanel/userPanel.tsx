import React, { useState, useEffect, useRef } from 'react';
import { Button } from "primereact/button";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { useGlobalContext } from '../context/appContext';

export default function UserPanel(){
    const op = useRef<OverlayPanel>(null);
    const {appData, setAppdata} = useGlobalContext();
    console.log(appData);

    let items = [
        { label: 'Profile', icon: 'pi pi-fw pi-user' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        { separator: true },
        { 
            command: () => { console.log('user profile') },
            template: (item: any, options: any) => {
                return (
                    <button 
                        onClick={(e) => options.onClick(e)} 
                        className='w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
                    >
                        <Avatar 
                            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" 
                            className="mr-2" 
                            shape="circle" 
                        />
                        <div className="flex flex-column align">
                            <span className="font-bold">Amy Elsner</span>
                            <span className="text-sm">Agent</span>
                        </div>
                    </button>
                )
            }
        }
    ];

    return(
        <>
        <Button 
            type="button" 
            className="!rounded-full !border-2 !border-white !border-solid !mx-2 !p-1 !bg-transparent" 
            onClick={(e) => op.current?.toggle(e)}
        >
            <svg 
                version="1.0" 
                xmlns="http://www.w3.org/2000/svg"
                width="25px" 
                height="25px" 
                viewBox="0 0 200.000000 200.000000"
                preserveAspectRatio="xMidYMid meet">
                <g 
                    transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                    fill="#FFFFFF" 
                >
                    <path stroke="white" strokeWidth="60" d="M881 1694 c-124 -33 -236 -129 -294 -251 -30 -65 -32 -74 -32 -188 0 -114 2 -123 32 -188 33 -69 129 -181 165 -193 29 -9 19 -13 -70 -29 -261 -46 -416 -166 -467 -362 -21 -80 -20 -182 1 -190 35 -13 49 11 56 96 17 206 144 330 393 383 86 19 132 22 335 22 202 0 249 -3 334 -22 251 -54 372 -170 396 -381 10 -93 14 -101 40 -101 27 0 33 16 31 82 -5 130 -51 236 -141 322 -83 79 -203 133 -340 151 -82 11 -85 16 -36 55 124 99 191 268 167 420 -21 131 -119 273 -229 333 -101 55 -232 71 -341 41z m280 -91 c156 -73 249 -244 220 -407 -23 -129 -103 -234 -221 -290 -58 -28 -75 -31 -160 -31 -82 0 -103 4 -153 27 -74 35 -157 114 -190 182 -74 150 -41 334 81 448 87 82 161 109 283 104 59 -2 89 -9 140 -33z"/>
                </g>
            </svg>
        </Button>

        <OverlayPanel ref={op} closeOnEscape>
            <div className="card flex justify-content-center">
                <Menu className={['user_menu'].join(' ')} model={items} />
            </div>
        </OverlayPanel>
        </>
    );
}