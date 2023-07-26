import { nodeInter } from "../types/types";
import API from "../api/api";

export const DocService = {
    getDocumentData(id_document: string):Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let urlencoded = new URLSearchParams();
                urlencoded.append("uid", id_document);
                const res = await API.post(process.env['BACKEND'] + '/document/get_data', urlencoded);
                resolve(res.data);
            }
            catch (e) {
                reject(e);
            }
        })
    },

    getNode(id_project: string, id_node:string):Promise<nodeInter[]> {
        return new Promise<nodeInter[]>(async (resolve, reject) => {
            try {
                let urlencoded = new URLSearchParams();
                urlencoded.append("uid", id_project);
                urlencoded.append("node", id_node);
                const res = await API.post(process.env['BACKEND'] + '/project/get_node', urlencoded);
                resolve(res.data.node);
            }
            catch (e) {
                reject(e);
            }
        })
    }
}