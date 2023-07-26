import React, { useState } from "react";
import { projectMenu } from "../types/types";
import Image from "next/image";
import style from "./template.module.css";
import TreeMenu from "../treeMenu/treeMenu";
import DotPanel from "../treeMenu/dotPanel";

export default function ListProject(props: projectMenu){
    const [toggleIcon, setToggleIcon] = useState('proj_close');
    
    function handleClickProj(id_proj:any){
        if(toggleIcon=='proj_open'){setToggleIcon('proj_close');}
        else{setToggleIcon('proj_open');}
    };

    return(
        <>
            <div 
                key={props.id_project}
                className={[style.proj_container].join(' ')}
            >
                <div className={[style.proj_header].join(' ')}>
                    <h2
                        className={[style.proj_item].join(' ')}
                        onClick={() => handleClickProj(props.id_project)}    
                    >
                    <div className={[style.icon_proj].join(' ')}>
                        <Image
                            src='./images/toggler_icon_close.svg'
                            alt=''
                            width='15'
                            height='15'
                            className={[style[toggleIcon]].join(' ')}
                        />
                    </div>
                    <div 
                        className={[style.text_proj, 'text-white', 'font-medium', 'text-lg'].join(' ')}
                    >
                        {props.project_name}
                    </div>
                    </h2>
                    <div className={[style.proj_actions].join(' ')}>
                        <DotPanel id_project={props.id_project} id_folder={0} />
                    </div>
                </div>
                <div className={[style.proj_body].join(' ')}>
                    {(toggleIcon == 'proj_open')? 
                    <TreeMenu 
                        id_project={props.id_project}
                    /> : ''}
                </div>
            </div>
            
        </>
    );
}