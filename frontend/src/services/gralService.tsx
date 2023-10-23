import { nodeInter } from "../types/types";
import API from "@/components/api/api";

export const NodeService = {
    getStartNodes(id_project: string):Promise<nodeInter[]> {
        return new Promise<nodeInter[]>(async (resolve, reject) => {
            try {
                let urlencoded = new URLSearchParams();
                urlencoded.append("uid", id_project);
                const res = await API.post(process.env['BACKEND'] + 'project/get_list', urlencoded);
                resolve(res.data.list);
            }
            catch (e) {
                reject(e);
            }
        })
    },

}