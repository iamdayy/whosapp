import useUserStore from '@/stores/User';
import { PushNotifications } from '@capacitor/push-notifications';


const useRegisterNotifications = async () => {
  try {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    await PushNotifications.addListener('registration', token => {
      const { me, updateProfile } = useUserStore();
      if (me) {
        updateProfile({
          ...me,
          fcm: token.value
        })
      }
      console.log('Registration Token: ', token.value);
    });
    await PushNotifications.register();
  } catch (error: any) {
    console.log(error);
    
  }
  
}

export default useRegisterNotifications;