import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InterProjectComponent } from "@/app/types/types";
import style from './template.module.css';
import newProject from "@/app/services/project";
import ListProject from "./listProjects";

export default function Projects(props: InterProjectComponent){
    const [visible, setVisible] = useState(false);
    const [formValue, setFormValue] = useState('');

    const handleSubmit = async (e: any) => {
        let res = newProject(e);
        setFormValue('');
        setVisible(false);
    }

    return(
        <>
            <Button 
                icon="pi pi-plus" 
                className={[style.btn].join(' ')} 
                text  
                severity="secondary" 
                aria-label="Bookmark" 
                label="Agregar Proyecto"
                onClick={() => setVisible(true)}
            />
            {
            props.lists? props.lists.map(
                (it: any, ind: any) => 
                    <ListProject 
                        key={ind} 
                        id_project={it.id_project}
                        project_name={it.project_name}
                    />
                ) : ''
            }
            <Dialog
                header="Nuevo Proyecto" 
                visible={visible}
                position='top'
                style={{ width: '30vw' }} 
                onHide={() => setVisible(false)}
            >
            <form>
                <div className="card flex justify-content-center">
                    <div className="">
                        <label htmlFor="username" className="w-full">Nombre del Proyecto</label>
                        <InputText 
                            className={['w-full', style.my_5].join(' ')}
                            value={formValue} 
                            onChange={(e:any) => setFormValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className="card flex justify-content-center my-2">
                    <Button
                        type="button"
                        severity="secondary" 
                        aria-label="Bookmark" 
                        label="Agregar Proyecto"
                        onClick={() => handleSubmit(formValue)}
                    />
                </div>
            </form>
            </Dialog>
        </>
    );
}