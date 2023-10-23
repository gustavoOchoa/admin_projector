import API from "@/components/api/api";
import { projectMenu } from "../types/types";

const newProject = (formData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let urlencoded = new URLSearchParams();
      urlencoded.append("project_name", formData);
      const res = await API.post(process.env['BACKEND'] + 'project/new_project', urlencoded);
      resolve(res.data);
    }
    catch (e) {
      reject(e);
    }
  })
};

export const getProject = (user: string):Promise<projectMenu[]> => {
  return new Promise<projectMenu[]>(async (resolve, reject) => {
    try {
      let urlencoded = new URLSearchParams();
      urlencoded.append("uid", user);
      const res = await API.post(process.env['BACKEND'] + 'project', urlencoded);
      resolve(res.data);
    }
    catch (e) {
      reject(e);
    }
  })
};

export default newProject;