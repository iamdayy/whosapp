<script setup lang="ts">
import useMessageStore from "@/stores/Message";
import useUserStore from "@/stores/User";
import ProfielPhoto from "@/assets/profile-image.png";
import { Message, User } from "@/types";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Capacitor } from "@capacitor/core"
import useCamera from "@/plugins/image";
import { useNotifier } from "@/plugins/vuetify-notifier";
import ImagePreview from "@/components/ImagePreview.vue";

const notifier = useNotifier()

const message = useMessageStore();
const user = useUserStore();
const route = useRoute();
const { me } = storeToRefs(user);
const { getMessageByUser, messages } = storeToRefs(message);

const text = ref<string>("")
const msg = ref<Message>({
  from: me.value?.username!,
  to: route.params.username as string,
  formself: true,
  body: {
    text: "",
    image: ""
  }
});

const pickImage = async () => {
  const { data } = await useCamera();
  msg.value.body.image = `data:image/png;base64,${data.value}`
  notifier.component(ImagePreview, {
    componentProps: {
      image: msg.value.body.image,
    },
    dialogProps: {
      width: Capacitor.isNativePlatform() ? '' : '60%',
      fullscreen: Capacitor.isNativePlatform()
    },
    width: '60%',
  }).then((res: { status: boolean, value: string }) => {
    if (res.status) {
      text.value = res.value;
      send();
    }
  })
  
}

const usr = ref<User>({} as User);

const send = async () => {
  msg.value.body.text = text.value;
  if (!msg.value.body.image && !msg.value.body.text) {
    return;
  }
  await message.createMessage(msg.value);
  messages.value.push(msg.value);
  text.value = ""
};
</script>
<template>
  <v-app-bar app>
    <template v-slot:prepend>
      <v-btn  @click="$router.push('/')" color="white" icon="mdi-arrow-left"></v-btn>
      <v-avatar :image="usr.avatar || ProfielPhoto" @click="$router.push({ name: 'Profile', params: { username: usr.username } })"></v-avatar>
    </template>
    <v-toolbar-title class="white--text">{{
      $route.params.username
    }}</v-toolbar-title>

    <template v-slot:append>
      <v-btn rounded icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  <v-main class="background" :style="`--backgroundImg: url(${me?.setting.wallpaper}); --wpOpacity: ${me?.setting.wpOpacity}`">
    <v-container fluid class="container">
      <v-row class="fill-height pb-14" align="end">
        <v-col>
          <div
            v-for="(item, index) in getMessageByUser($route.params.username as string)"
            :key="index"
            :class="[
              'd-flex flex-row align-center my-2',
              item.formself ? 'justify-end' : null,
            ]"
          >
            <v-sheet rounded="lg" class="pa-2">
              <img :src="item.body.image" :class="item.formself ? 'mr-1' : 'ml-1'" />
              <span :class="item.formself ? 'mr-1' : 'ml-1'">{{
                item.body.text
              }}</span>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-footer absolute app color="transparent">
    <v-row no-gutters>
      <v-col>
        <v-container fluid class="ma-0 pa-0">
          <div class="d-flex flex-row align-center">
            <v-text-field
              v-model="text"
              :append-icon="text ? 'mdi-send' : 'mdi-microphone'"
              prepend-inner-icon="mdi-emoticon-outline"
              append-inner-icon="mdi-camera"
              rounded="lg"
              density="compact"
              variant="outlined"
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
              @click:append="send"
              @click:append-inner="pickImage"
              @keyup.enter="send"
            ></v-text-field>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-footer>
</template>
<style scoped>
.background:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: var(--wpOpacity);
  background: var(--backgroundImg);
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
.container {
  position: relative;
}
</style>
