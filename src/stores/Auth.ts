import { AuthState } from "@/types/States";
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { IResponseChangePassword, IResponseLogin, IResponseRegister, IResponseReqToken, IResponseResetPassword } from "@/types/IResponse";
import { IMethodChangePassword, IMethodGetToken, IMethodLogin, IMethodRegister, IMethodResetPassword } from "@/types/IMethods";
import { AxiosResponse } from "axios";
import useStorageState from "@/plugins/storage";
const useAuthStore = defineStore("Auth", {
    state: (): AuthState => ({
        jwt_refresh: "",
        jwt_token: "",
        signed: false,
    }),
    getters: {},
    actions: {
        async onInit() {
            const { getStorage } = useStorageState();
            
            const jwt_tkn = await getStorage("jwt_tkn");
            const jwt_re = await getStorage("jwt_re");
            if (jwt_re) {
                this.jwt_refresh = jwt_re;
            }
            if (jwt_tkn) {
                this.jwt_token = jwt_tkn
            }
        },
        setAuthData (payload: IResponseLogin) {
            const { setStorage } = useStorageState();
            this.jwt_refresh = payload.jwt_refresh;
            this.jwt_token = payload.jwt_token
            setStorage("jwt_re", payload.jwt_refresh);
            setStorage("jwt_tkn", payload.jwt_token);
        },
        async register (payload: IMethodRegister) {
            try {
                const { data } = await axios.post<IResponseRegister, AxiosResponse<IResponseRegister>, IMethodRegister>("signup", payload);
                return Promise.resolve(data);
            } catch (error: any) {
                return Promise.reject({
                    status: false,
                    message: error.message
                })
            }
        },
        async login(payload: IMethodLogin) {
            try {
                const { data } = await axios.post<IResponseLogin, AxiosResponse<IResponseLogin>, IMethodLogin>("signin", payload);
                this.setAuthData(data)
                return Promise.resolve(data);
            } catch (error: any) {
                return Promise.reject({
                    status: false,
                    message: error.message
                })
            }
        },
        async getToken(payload: IMethodGetToken) {
            try {
                const { data } = await axios.get<IResponseReqToken, AxiosResponse<IResponseReqToken>>("/get-token", {
                    params: payload,
                });
                return Promise.resolve({
                    status: true,
                    message: data.message,
                })
            } catch (error: any) {
                return Promise.reject({
                    status: false,
                    message: error.message
                })
            }
        },
        async resetPassword(payload: IMethodResetPassword) {
            try {
                const { data } = await axios.post<IResponseResetPassword, AxiosResponse<IResponseResetPassword>, IMethodResetPassword>("reset-password", payload);
                return Promise.resolve<IResponseResetPassword>({
                    status: true,
                    message: data.message
                })
            } catch (error: any) {
                return Promise.reject({
                    status: false,
                    message: error.message
                })
            }
        },
        async changePassword (payload: IMethodChangePassword) {
            try {
                const { data } = await axios.post<IResponseChangePassword, AxiosResponse<IResponseChangePassword>, IMethodChangePassword>("change-password", payload);
                return Promise.resolve<IResponseChangePassword>({
                    status: true,
                    message: data.message,
                });
            } catch (error: any) {
                return Promise.reject({
                    status: false,
                    message: error.message
                })
            }
        }
    },
});

export default useAuthStore;