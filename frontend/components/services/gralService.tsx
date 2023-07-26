import { nodeInter } from "../types/types";
import API from "../api/api";

export const NodeService = {
    getStartNodes(id_project: string):Promise<nodeInter[]> {
        return new Promise<nodeInter[]>(async (resolve, reject) => {
            try {
                let urlencoded = new URLSearchParams();
                urlencoded.append("uid", id_project);
                const res = await API.post(process.env['BACKEND'] + '/project/get_list', urlencoded);
                resolve(res.data.list);
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