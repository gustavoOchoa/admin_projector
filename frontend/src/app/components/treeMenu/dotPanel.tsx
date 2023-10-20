import React, { useRef, useEffect, useState } from "react";
import st from './treeMenu.module.css';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { MegaMenu } from 'primereact/megamenu';
import { MenuItem } from 'primereact/menuitem';
import { dotPanel } from "@/app/types/types";
import { Dialog } from 'primereact/dialog';
import AddItemFolder from "./addItemFolder";

export default function DotPanel(props: dotPanel){
    const op:any = useRef(null);
    const [visible, setVisible] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const [header, setHeader] = useState('');
    const [name, setName] = useState('');

    const items: MenuItem[] = [
        {
            label: 'Crear', 
            id: 'create',
            items: [
                [
                    {
                        items: [
                            { 
                                label: 'Documento', 
                                command(event) { setVisible(true); setActiveItem('doc'); setHeader('Creación de Documento'); }, 
                                id: 'doc' 
                            }, 
                            { 
                                label: 'Lista', 
                                command(event) { setVisible(true); setActiveItem('list'); setHeader('Creación de Lista');}, 
                                id: 'list' 
                            },
                            { 
                                label: 'Carpeta', 
                                command(event) { setVisible(true); setActiveItem('folder'); setHeader('Creación de Carpeta'); }, 
                                id: 'folder' 
                            }
                        ]
                    }
                ]
            ]
        },
        { label: 'Cambiar Nombre', id: 'change', command(event) { setVisible(true); setActiveItem('change'); setHeader('Cambiar Nombre');} },
        { label: 'Añadir a Favoritos', id: 'addFav', command(event) { setVisible(true); setActiveItem('addFav'); setHeader('Añadir a Favoritos'); } },
        { label: 'Eliminar', id: 'del', command(event) { setVisible(true); setActiveItem('del'); setHeader('Eliminar'); } }
    ];

    return(
        <div className={['dot_panel', (props.type=='folder')? 'folder' : '' ].join(' ')} key={Number(props.id_folder)}>
            <Button 
                type="button" 
                className={[st.folder_dots].join(' ')}
                label="..." 
                onClick={(e) => op.current.toggle(e)}
            />
            <OverlayPanel ref={op}>
                <MegaMenu model={items} orientation="vertical" />
                <Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddItemFolder showForm={activeItem} id_folder={Number(props.id_folder)} id_project={props.id_project}/>
                </Dialog>
            </OverlayPanel>
        </div>
    );
}