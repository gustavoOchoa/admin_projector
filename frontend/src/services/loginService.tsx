import API from "@/components/api/api";

const loggon = (formData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let urlencoded = new URLSearchParams();
      urlencoded.append("email", btoa(formData.email));
      urlencoded.append("password", btoa(formData.password));
      const res = await API.post(process.env['BACKEND'] + 'user/login', urlencoded);
      resolve(res.data);
    }
    catch (e) {
      reject(e);
    }
  })
};

export const register = (formData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let urlencoded = new URLSearchParams();
      urlencoded.append("email", btoa(formData.email));
      urlencoded.append("username", btoa(formData.userName));
      urlencoded.append("password", btoa(formData.password));
      urlencoded.append("password2", btoa(formData.password2));
      const res = await API.post(process.env['BACKEND'] + 'user/register', urlencoded);
      resolve(res.data);
    }
    catch (e) {
      reject(e);
    }
  })
};

export default loggon;