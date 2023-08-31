import { IResponseRefreshJWT } from "@/types/IResponse";
import rawAxios from "axios";
import Auth from "@/stores/Auth";
import { storeToRefs } from "pinia";
import router from "@/routes";
import useStorageState from "./storage";


const axios = rawAxios.create({
    baseURL: "http://192.168.0.115:3000/api/",
});

axios.interceptors.request.use(
    (config) => {
    const { jwt_token } = storeToRefs(Auth())
    if (jwt_token) {
        config.headers.Authorization = `Bearer ${jwt_token.value}`;
    }
    return config;
    },
    (error) => {
      return Promise.reject(error);
    }
    );
  

const axiosunAuth = axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
      const { jwt_refresh,jwt_token } = storeToRefs(Auth())
    if (err.response.status === 401 && !err.config.__isRetryRequest) {
      axios.interceptors.response.eject(axiosunAuth);
      try {
          const { data } = await axios.get<IResponseRefreshJWT>("refresh", {
            headers: {
                Authorization: `Bearer ${jwt_refresh.value}`
            }
        });
        jwt_token.value = data.jwt_token
        
      } catch (error) {
        const { removeStorage } = useStorageState();
        removeStorage("jwt_re");
        removeStorage("jwt_tkn");
        router.push({ name: "Auth" })
      }
    }

    return Promise.reject(err);
  });

  export default axios;