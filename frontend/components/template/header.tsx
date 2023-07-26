import React, { useState } from "react";
import st from './template.module.css';

export default function Header({ setMenuVisible }: any){

    return(
        <>
            <div className={[st.header].join(' ')}>
                <div className={[st.header_left].join(' ')}></div>
                <div className={[st.header_rigth].join(' ')}></div>
            </div>
        </>
    );
}