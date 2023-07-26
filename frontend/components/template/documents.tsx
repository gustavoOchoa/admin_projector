import React from "react";
import { Button } from "primereact/button";
import style from './template.module.css';

export default function Documents(){
    return(
        <>
            <Button icon="pi pi-plus" className={[style.btn].join(' ')} 
                text
                severity="secondary" 
                aria-label="Bookmark" 
                label="Agregar Documento" 
            />
        </>
    );
}