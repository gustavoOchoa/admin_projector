import React, { useRef, useEffect, useState } from "react";
import st from './addItemFolder.module.css';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { itemFolder } from "@/app/types/types";

export default function AddItemFolder(props: itemFolder){
    
    useEffect(() => {

    }, [props.showForm]);

    return(
        <div className="add_panel">
            {
            (props.showForm == 'doc' || props.showForm == 'list' || props.showForm == 'folder')? 
            <div className="relative mb-3">
                <form>
                <div className="flex flex-wrap items-stretch">
                    <span
                        className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-4 py-[0.45rem] text-center text-xl font-normal text-neutral-200"
                        id="inputGroup-sizing-default"
                    >
                        Nombre
                    </span>
                    <input
                        type="text"
                        className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 py-[0.45rem] text-xl font-normal text-neutral-200 outline-none focus:border-white focus:shadow-[outset_0_0_0_1px_rgb(255,255,255)]"
                    />
                    <input className="text-black" type="hidden" value={props.showForm} />
                    <input className="text-black" type="hidden" value={props.id_folder} />
                    <input className="text-black" type="hidden" value={props.id_project} />
                </div>
                <div className="items-start">
                    <div className="pt-2">
                    <button className="shadow bg-white  hover:bg-slate-400 hover:text-white focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                        Enviar
                    </button>
                    </div>
                </div>
                </form>
            </div>
            : ''
            }

{
            (props.showForm == 'del')? 
            <div className="relative mb-3">
                <div>
                    <p>Esta Seguro que desea Eliminar?</p>
                </div>
                <div className="items-start">
                    <div className="pt-2">
                    <button className="shadow bg-white  hover:bg-slate-400 hover:text-white focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                        Si
                    </button>
                    <button className="shadow bg-white  hover:bg-slate-400 hover:text-white focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                        No
                    </button>
                    </div>
                </div>
            </div>
            : ''
            }

{
            (props.showForm == 'change')? 
            <div className="relative mb-3">
                <form>
                <div className="flex flex-wrap items-stretch">
                    <span
                        className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-4 py-[0.45rem] text-center text-xl font-normal text-neutral-200"
                        id="inputGroup-sizing-default"
                    >
                        Nuevo Nombre
                    </span>
                    <input
                        type="text"
                        className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 py-[0.45rem] text-xl font-normal text-neutral-200 outline-none focus:border-white focus:shadow-[outset_0_0_0_1px_rgb(255,255,255)]"
                    />
                    <input className="text-black" type="hidden" value={props.showForm} />
                    <input className="text-black" type="hidden" value={props.id_folder} />
                    <input className="text-black" type="hidden" value={props.id_project} />
                </div>
                <div className="items-start">
                    <div className="pt-2">
                    <button className="shadow bg-white  hover:bg-slate-400 hover:text-white focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                        Enviar
                    </button>
                    </div>
                </div>
                </form>
            </div>
            : ''
            }
        </div>
    );
}