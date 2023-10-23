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

export default loggon;