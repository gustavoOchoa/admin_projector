import React, { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import TreeNode from 'primereact/treenode'

export default function Dashboard(){
    const [nodes, setNodes] = useState<TreeNode[]>([]);
    
    const data = [
        {
            "key": "1",
            "label": "Primer Doc",
            "leaf": true,
            "data": "Primer Doc doc",
            "type": "doc",
            "icon": "pr pr-document"
        },
        {
            "key": "2",
            "label": "Carpeta 1",
            "leaf": false,
            "data": "Carpeta 1 folder",
            "type": "folder",
            "icon": "pr pr-folder",
            "children": [
                {
                    "key": "4",
                    "label": "Carpeta 2",
                    "leaf": false,
                    "data": "Carpeta 2 folder",
                    "type": "folder",
                    "icon": "pr pr-folder",
                    "children": [
                        {
                            "key": "5",
                            "label": "Documentacion ReactJS",
                            "leaf": true,
                            "data": "Documentacion ReactJS doc",
                            "type": "doc",
                            "icon": "pr pr-document"
                        }
                    ]
                },
                {
                    "key": "6",
                    "label": "Lista de carpeta 1",
                    "leaf": true,
                    "data": "Lista de carpeta 1 list",
                    "type": "list",
                    "icon": "pr pr-list"
                }
            ]
        },
        {
            "key": "3",
            "label": "Lista 1",
            "leaf": true,
            "data": "Lista 1 list",
            "type": "list",
            "icon": "pr pr-list"
        }
    ];


    useEffect(() => {
        setNodes(data);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Tree value={nodes} className="w-full md:w-30rem" />
        </div>
    )
}