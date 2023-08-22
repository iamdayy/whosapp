import { User } from "@/types";
import {
  IMethodGetProfile,
  IMethodUpdateProfile,
} from "@/types/IMethods";
import {
  IResponseGetMe,
  IResponseGetProfile,
  IResponseGetProfiles,
  IResponseUpdateProfile,
} from "@/types/IResponse";
import { UserState } from "@/types/States";
import { AxiosResponse } from "axios";
import axios from "@/plugins/axios";
import { defineStore } from "pinia";

const useUserStore = defineStore("User", {
  state: (): UserState => ({
    freinds: [] || null,
    me: undefined,
  }),
  getters: {
    GetMe(): User | void {
      if (this.me) {
        return this.me;
      }
    },
  },
  actions: {
    async getMe() {
      try {
        const { data } = await axios.get<
          IResponseGetMe,
          AxiosResponse<IResponseGetMe>
        >("user/me");
        if (data) {
          this.me = data.account;
        }
        return Promise.resolve<IResponseGetMe>({
          status: true,
        });
      } catch (error: any) {
        return Promise.reject({
          status: false,
          message: error.message,
        });
      }
    },
    async updateProfile(payload: IMethodUpdateProfile) {
      try {
        const { data } = await axios.put<
          IResponseUpdateProfile,
          AxiosResponse<IResponseUpdateProfile>,
          IMethodUpdateProfile
        >("user/me", payload);
        return Promise.resolve<IResponseUpdateProfile>(data);
      } catch (error: any) {
        return Promise.reject({
          status: false,
          message: error.message,
        });
      }
    },
    async getProfile(payload: IMethodGetProfile) {
      try {
        const { data } = await axios.get<IResponseGetProfile>("user/", {
          params: payload,
        });
        return Promise.resolve<IResponseGetProfile>(data);
      } catch (error: any) {
        return Promise.reject({
          status: false,
          message: error.message,
        });
      }
    },
    async getFreinds() {
      try {
        const { data } = await axios.get<IResponseGetProfiles>("user/many", {
          params: {
            searchs: this.me?.freinds
          },
        });
        this.freinds = data.accounts;
        return Promise.resolve<IResponseGetProfiles>({
          status: true,
        });
      } catch (error: any) {
        return Promise.reject({
          status: false,
          message: error.message,
        });
      }
    },
  },
});

export default useUserStore;
