import React, { useEffect, useState } from "react";
import StaticMenu from "./staticMenu";
import { Accordion, AccordionTab } from 'primereact/accordion';
import Projects from "./projects";
import Favorites from "./favorites";
import Documents from "./documents";
import { getProject } from "@/app/services/project";
import { projectMenu } from "@/app/types/types";
import style from './template.module.css';

export default function Menu({ menuVisible }:any){
    const [tabVisible, setTabVisible] = useState<number | undefined | null>(null);
    const [classVal, setClassVal] = useState(style.show);
    const [projects, setProjects] = useState<projectMenu[]>([]);
    const staticMenuData = [
        {
            svg: 'images/home.svg',
            title: 'Inicio',
            url: '/admin'
        },
        {
            svg: 'images/notifications.svg',
            title: 'Notificaciones',
            url: '/admin/notifications'
        }
    ];

    useEffect(()=>{
        const fetchProj = async () => {
            const result = await getProject('5');
            setProjects(result);
        };
        fetchProj();
    }, []);

    return (
        <nav 
            id="sidebar-menu"
            className={['pr-1', 'overflow-x-hidden', 'w-[230px]', classVal].join(' ')}
            aria-describedby={menuVisible? 'open' : 'close' }
        >
            <div className="mh-18 text-center py-5">
                <a href="#" className="relative">
                    <h2 className="px-4 max-h-9 overflow-hidden hidden-compact">
                    <span className="font-semibold text-2xl text-white">Projector</span>
                    </h2>
                </a>
            </div>
            {staticMenuData? staticMenuData.map(
                (it: any, ind: any) => 
                <StaticMenu 
                    key={ind}
                    svg={it.svg}
                    title={it.title}
                    url={it.url} 
                />) : 
            ''}
            <div className="side-menu">
            <Accordion onTabOpen={(e) => setTabVisible(e.index)} >
                <AccordionTab header="Favoritos">
                    <Favorites />
                </AccordionTab>
                <AccordionTab header="Proyectos">
                    <Projects 
                        lists={projects} 
                    />
                </AccordionTab>
                <AccordionTab header="Documentos">
                    <Documents />
                </AccordionTab>
            </Accordion>
            </div>
        </nav>
    );
}