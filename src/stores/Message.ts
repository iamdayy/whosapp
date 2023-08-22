import { IMethodCreateMessage } from "@/types/IMethods";
import { IResponseCreateMessage, IResponseGetMessage } from "@/types/IResponse";
import { MessageState } from "@/types/States";
import { AxiosResponse } from "axios";
import axios from "@/plugins/axios";
import { defineStore } from "pinia";

const useMessageStore = defineStore("Message", {
    state: (): MessageState => ({
        messages: [],
    }),
    getters: {
        getMessageByUser(state) {
            return (email: string) => state.messages.filter((message) => message.to == email || message.from == email);
        }
    },
    actions: {
        async getMessages() {
            try {
                const { data } = await axios.get<IResponseGetMessage>("message");
                this.messages = data.messages;
                return Promise.resolve<IResponseGetMessage>(data);
            } catch (error: any) {
                return Promise.reject({
                    stasus: false,
                    message: error.message,
                })
            }
        },
        async createMessage(payload: IMethodCreateMessage) {
            try {
                const { data } = await axios.post<IResponseCreateMessage, AxiosResponse<IResponseCreateMessage>, IMethodCreateMessage>("message", payload);
                return Promise.resolve(data);
            } catch (error: any) {
                return Promise.reject({
                    stasus: false,
                    message: error.message,
                })
            }
        }
    },
});

export default useMessageStore;