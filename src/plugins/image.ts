import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ref } from "vue";

export default async function useCamera() {
    const data = ref<string | undefined>();
    const err = ref<any>(null);
    try {
        await permit()
        const camera = await Camera.getPhoto({
            quality: 8,
            resultType: CameraResultType.Base64,
            saveToGallery: true,
            webUseInput: true,
            allowEditing: true,
            source: CameraSource.Prompt
        });
        data.value = camera.base64String
    } catch (error: any) {
        err.value =  error
    }
    return {
        data,
        err
    }
}

async function permit() {
    const permit = await Camera.checkPermissions();
    if (permit.camera !== 'granted') {
        Camera.requestPermissions({ permissions: ['camera'] })
    }
    if (permit.camera !== 'granted') {
        Camera.requestPermissions({ permissions: ['photos'] })
    }
}