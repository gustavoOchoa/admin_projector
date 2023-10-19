import { SetStateAction } from "react"

export interface staticMenuInter{
    svg: string
    title: string
    url: string
}

export interface projectMenu{
    id_project: string
    project_name: string
}

export interface InterProjectComponent{
    lists: projectMenu[]
}

export interface InterTreeMenu{
    id_project: string
}

export interface nodeInter{
    key: string
    label: string
    leaf: boolean
    data: string
    icon: string | undefined | null
    type: string
    children?: nodeInter[]
}

export interface dotPanel{
    type: string
    id_project: number | string
    id_folder: number | string
    name?: string
}

export interface itemFolder{
    showForm: string
    id_project: number | string
    id_folder: number | string
}