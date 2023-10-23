import React, { useState } from "react";
import { projectMenu } from "@/types/types";
import style from "./template.module.css";
import TreeMenu from "@/components/treeMenu/treeMenu";
import DotPanel from "@/components/treeMenu/dotPanel";

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
                    <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 14 14" 
                        fill="#FFFFFF" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={[style[toggleIcon], 'p-icon', 'p-tree-toggler-icon'].join(' ')} 
                        aria-hidden="true">
                        <path d="M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z" fill="currentColor"></path>
                    </svg>
                    </div>
                    <div 
                        className={[style.text_proj, 'text-white', 'font-medium', 'text-lg'].join(' ')}
                    >
                        {props.project_name}
                    </div>
                    </h2>
                    <div className={[style.proj_actions].join(' ')}>
                        <DotPanel id_project={props.id_project} id_folder={0} type="otro" />
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