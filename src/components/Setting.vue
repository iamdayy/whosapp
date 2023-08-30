<script setup lang="ts">
import { ref } from 'vue';
import { Language, Setting } from "@/types/index"
import MobileWallpaper from "@/assets/mobile-wallpaper.jpg"
import useUserStore from '@/stores/User';
import useCamera from '@/plugins/image';
import { storeToRefs } from 'pinia';

const user = useUserStore();

const { me } = storeToRefs(user);
const setting = ref<Setting>({
    notification: false,
    language: 'id',
    wallpaper: ''
} as Setting);
if (me.value) {
    setting.value = me.value.setting
}
const languages = ref<Language[]>([
    {
        title: 'Indonesia',
        id: 'id',
    },
    {
        title: 'English',
        id: 'en'
    }
])

const uploadImage = async () => {
  const { data, err } = await useCamera()
  if (data.value) {
    
    setting.value.wallpaper = `data:image/png;base64,${data.value}`
  }
  if (err.value) {
    console.log(err.value);
  }
}

const save = async () => {
  try {
    const data = await user.updateProfile(me.value!);
    console.log(data);
  } catch (error: any) {
    console.log(error);
  }
}
const selected = (e: any) => {
    console.log(e);
}

</script>
<template>
  <v-list lines="three" bg-color="transparent" select-strategy="single-independent" @click:select="selected">
    <v-list-subheader>User Controls</v-list-subheader>

    <v-list-item value="filter">
      <v-list-item-title>Content filtering</v-list-item-title>
s
      <v-list-item-subtitle>
        Set the content filtering level to restrict appts that can be downloaded
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item value="password">
      <v-list-item-title>Password</v-list-item-title>

      <v-list-item-subtitle>
        Require password for purchase or use password to restrict purchase
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>

  <v-divider></v-divider>

  <v-list lines="three" color="success" bg-color="transparent" @click:select="selected">
    <v-list-subheader>General</v-list-subheader>

    <v-list-item rounded="lg" value="notification" :active="setting.notification" @click="setting.notification = !setting.notification">
      <template v-slot:append="{ isActive }">
        <v-list-item-action end>
          <v-switch :model-value="isActive"></v-switch>
        </v-list-item-action>
      </template>

      <v-list-item-title>Notifications</v-list-item-title>

      <v-list-item-subtitle>
        Notify me when new message
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>Wallpaper</v-list-item-title>

      <v-list-item-subtitle>
        <v-img :src="setting.wallpaper || MobileWallpaper" width="125" class="avatar-shadow">
          <v-btn class="upload-btn" icon="mdi-camera" variant="plain" @click="uploadImage"> </v-btn>
        </v-img>
        Add Wallpaper on your chat page
        <v-slider></v-slider>
      </v-list-item-subtitle>
    </v-list-item>
    <v-combobox class="mt-2" variant="solo" label="Language" :items="languages" item-title="title" item-value="id" @update:model-value="selected"></v-combobox>
  </v-list>
  <v-btn variant="tonal" rounded block color="success" @click="save">Save Changes</v-btn>
</template>
<style scoped>
.upload-btn {
  position: absolute !important;
  z-index: 999;
  /* top: 85px; */
  visibility: hidden;
  /* color: cadetblue; */
  /* background: blueviolet; */
  background: rgb(125, 198, 163);
  /* background: linear-gradient(
    50deg,
    rgba(125, 198, 163, 1) 0%,
    rgba(35, 216, 227, 1) 72%
  ); */
}

.avatar-shadow {
  box-shadow: 0px 0px 10px 0px rgba(50, 12, 112, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(50, 12, 112, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(50, 12, 112, 0.75);
}

.avatar-shadow:hover {
  .upload-btn {
    visibility: visible;
  }
}
</style>
