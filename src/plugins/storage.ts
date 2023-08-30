// import { readonly, ref } from "vue";
import { Capacitor } from "@capacitor/core"
import { Preferences } from "@capacitor/preferences";

const useStorageState = () => {
    const getStorage = async (key: string): Promise<string | null> => {
        if (Capacitor.isNativePlatform()) {
            const data = await Preferences.get({ key: key});
            return Promise.resolve(data.value);
        } else {
            const data = localStorage.getItem(key);
            return Promise.resolve(data);
        }
    };
    const setStorage = async (key: string, value: string): Promise<void> => {
        if (Capacitor.isNativePlatform()) {
            await Preferences.set({ key, value });
            return Promise.resolve();
        } else {
            localStorage.setItem(key, value);
            return Promise.resolve();
        }
    };
    const removeStorage = async (key: string): Promise<void> => {
        if (Capacitor.isNativePlatform()) {
            await Preferences.remove({ key: key});
            return Promise.resolve();
        } else {
            localStorage.removeItem(key);
            return Promise.resolve();
        }
    }
    return {
        getStorage,
        setStorage,
        removeStorage
    }
}

export default useStorageState;