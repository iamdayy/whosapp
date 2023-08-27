<script setup lang='ts'>
import { onMounted } from 'vue';
import useAuthStore from './stores/Auth';
import socket from './plugins/socket';
import { Message } from './types';
import useMessageStore from './stores/Message';
import { storeToRefs } from 'pinia';
import useRegisterNotifications from './plugins/fcm';

const message = useMessageStore();
const auth = useAuthStore();

const { messages } = storeToRefs(message)
onMounted(() => {
  auth.onInit();
  useRegisterNotifications()
  socket.on("message", (socket: Message) => {
    messages.value.push(socket);
  })
})</script>
<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>
<style scoped></style>