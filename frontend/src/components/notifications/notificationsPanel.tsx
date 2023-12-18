import React, { useState, useEffect, useRef } from 'react';
import { Button } from "primereact/button";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';

export default function NotificationsPanel(){
    const op = useRef<OverlayPanel>(null);

    let items = [
        { label: 'Notification 1', icon: 'pi pi-fw pi-user' },
        { label: 'Notification 2', icon: 'pi pi-fw pi-cog' },
        { separator: true },
        { 
            command: () => { console.log('user profile') },
            template: (item: any, options: any) => {
                return (
                    <button 
                        onClick={(e) => options.onClick(e)} 
                        className='w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
                    >
                        Go notifications 
                    </button>
                )
            }
        }
    ];

    return(
        <>
        <Button 
            type="button" 
            className="!rounded-full !mx-2 !p-1 !bg-transparent !border-none" 
            onClick={(e) => op.current?.toggle(e)}
        >
            <svg 
                version="1.0" 
                xmlns="http://www.w3.org/2000/svg"
                width="30px" 
                height="30px" 
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
            >
                <g 
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#FFFFFF" 
                >
                    <path stroke="white" strokeWidth="100" d="M2220 4785 c-73 -21 -127 -54 -177 -108 -93 -100 -112 -180 -113 -458 l0 -166 -85 -33 c-343 -132 -615 -420 -743 -782 -62 -174 -65 -205 -72 -758 -7 -527 -6 -519 -53 -646 -50 -136 -162 -309 -308 -474 -38 -44 -79 -99 -89 -122 -51 -112 1 -246 115 -299 37 -17 73 -19 502 -19 l463 0 6 -27 c37 -169 86 -265 189 -369 64 -65 97 -90 165 -122 47 -23 112 -49 145 -58 80 -20 260 -20 340 0 187 50 355 184 433 346 22 47 48 118 58 158 l17 72 444 0 c489 0 485 0 552 63 47 44 71 101 71 167 0 75 -22 117 -124 234 -188 216 -313 447 -332 611 l-6 50 109 21 c373 72 672 338 786 699 71 226 59 488 -32 706 -97 232 -312 448 -539 544 -290 122 -601 110 -877 -34 l-90 -46 -50 27 c-27 15 -87 42 -132 59 l-81 32 -4 226 -3 226 -32 67 c-81 172 -274 263 -453 213z m171 -156 c55 -17 108 -65 135 -123 22 -48 24 -63 24 -233 l0 -182 -32 7 c-38 8 -310 10 -378 2 l-45 -5 -3 140 c-3 174 8 255 44 306 56 82 158 117 255 88z m211 -713 c54 -14 129 -40 168 -57 l70 -32 -64 -67 c-306 -325 -354 -839 -114 -1230 69 -113 224 -267 336 -334 103 -61 232 -110 348 -132 118 -21 114 -19 114 -51 0 -49 37 -185 74 -272 66 -156 196 -351 336 -504 61 -67 70 -107 31 -139 -22 -17 -82 -18 -1582 -18 -1546 0 -1559 0 -1579 20 -35 35 -26 69 38 141 194 219 316 420 378 624 l28 90 6 515 c4 283 10 524 13 535 4 11 15 56 26 101 73 295 287 566 561 712 92 50 229 98 330 117 121 23 360 14 482 -19z m1198 -21 c144 -46 231 -98 334 -194 159 -151 252 -362 263 -601 12 -231 -69 -448 -231 -618 -175 -184 -384 -275 -631 -275 -380 0 -705 237 -827 603 -31 91 -32 102 -32 250 0 186 17 262 94 416 95 194 269 343 481 413 108 35 147 40 309 37 137 -3 165 -6 240 -31z m-961 -3017 c-24 -112 -124 -251 -228 -317 -87 -56 -153 -74 -276 -74 -122 -1 -184 17 -280 78 -104 66 -204 208 -221 313 l-7 42 511 0 510 0 -9 -42z"/>
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