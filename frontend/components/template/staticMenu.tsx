import React from "react";
import Image from "next/image";
import Link from 'next/link';
import st from './template.module.css';
import { staticMenuInter } from "../types/types";

export default function StaticMenu(props: staticMenuInter){
    
    return(
        <ul id="side-menu">
            <li>
                <Link 
                    className="cursor-pointer h-[50px] flex items-center pl-5 text-white mb-1 relative z-10 bg-slate-800"
                    href={props.url}
                >
                    <div className="">
                        <Image 
                            className={[st.svg_white].join(' ')}
                            src={process.env['FRONTEND']+props.svg}
                            alt={props.title}
                            width='30'
                            height='30'
                        />
                    </div>
                    <div className="hidden xl:flex items-center w-full ml-3 text-white font-medium">
                        {props.title} 
                    </div>
                </Link>
            </li>
        </ul>
    );
}