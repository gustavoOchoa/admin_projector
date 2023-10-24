import axios from 'axios';

const API = () => {
    let instance = axios.create();

    instance.interceptors.request.use(async function (config) {
        const url = window.location;
        /** Verificacion por typescript */
        config.headers = config.headers ?? {};

        const token = process.env.TOKEN;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        //config.headers['X-Requested-With'] = 'XMLHttpRequest';
        /** Agregar withCredentials: true a los encabezados  */
        config.withCredentials = true;
        return config;
    }, error => {
        return Promise.reject(error);
    });

    instance.interceptors.response.use(
        function (response) {
            /** Verificacion por typescript */
            /*console.log("Interceptor -> Retrieving cookie:");
            console.log("All cookies:", document.cookie);*/
            response.config.headers = response.config.headers ?? {};
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default API();