import React, { useState, useEffect } from "react";
import { InterTreeMenu, nodeInter } from "../types/types";
import { Tree } from 'primereact/tree';
import { NodeService } from '../services/gralService';
import st from './treeMenu.module.css';
import Link from "next/link";
import DotPanel from "./dotPanel";

export default function TreeMenu(props: InterTreeMenu){
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes] = useState<nodeInter[]>([]);
    const nodeTemplate = (node: any, options:any) => {
        if(node.type === 'folder'){
            return (
                <>
                    <span className={[options.className, st.folder].join(' ')}>{node.label}</span>
                    <DotPanel id_project={props.id_project} id_folder={node.key}/>
                </>
            )
        }
        else{
            return (
                <>
                    <Link 
                        href={(node.type === 'list')? `/list/${node.key}` : `/document/${node.key}`}
                        className={[options.className, st.label].join(' ')}
                    >
                        {node.label}
                    </Link>
                </>
            ); 
        }
        
    }
    const togglerTemplate = (node: any, options:any) => {
        if (!node) {
            return;
        }
        const expanded = options.expanded;
        const iconClassName = (expanded)? st.caret_down: st.caret_right;

        return (
            <>
                {
                (node.type == 'folder')?
                <button 
                    type="button"
                    className={['p-tree-toggler', 'p-link'].join(' ')}
                    tabIndex={-1} 
                    onClick={options.onClick}
                >
                    <span className={iconClassName} aria-hidden="true"></span>
                </button> 
                :   
                <span 
                    className={[(node.type == 'doc')? st.pr_doc : st.pr_list, st.pr_no_folder].join(' ')}
                ></span>
                }
            </>
        );
    };

    useEffect(() => {
        const fetchList = async () => {
            const result = await NodeService.getStartNodes(props.id_project);
            setNodes(result);
            setLoading(false);
        };
        fetchList();        
    }, [props.id_project]);

    return(
        <div className="card flex justify-content-center">
            <Tree 
                value={nodes} 
                loading={loading} 
                className={['w-full', st.pr_theme].join(' ')}
                nodeTemplate={nodeTemplate}
                togglerTemplate={togglerTemplate}
            />
        </div>
    );
}