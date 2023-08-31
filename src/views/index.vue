<script setup lang="ts">
import { ref } from "vue";
import { Tabs } from "@/types";
import ChatsList from "@/components/ChatsList.vue";
import FreindsList from "@/components/FreindsList.vue";
// import StatusList from "@/components/StatusList.vue";
import Setting from "@/components/Setting.vue";
import ProfilePhoto from "@/assets/profile-image.png";
import useUserStore from "@/stores/User";
import { onMounted, shallowRef } from "vue";
import useMessageStore from "@/stores/Message";
import socket from "@/plugins/socket";
import { storeToRefs } from "pinia";

const user = useUserStore();
const { me } = storeToRefs(user);
const message = useMessageStore();

const tabs = ref<Tabs[]>([
  {
    key: 1,
    title: "Chats",
    icon: "mdi-forum",
    component: shallowRef(ChatsList),
  },
  {
    key: 2,
    title: "Freinds",
    icon: "mdi-account-group",
    component: shallowRef(FreindsList),
  },
  // {
  //   key: 3,
  //   title: "Status",
  //   icon: "mdi-target-account",
  //   component: StatusList,
  // },
  {
    key: 4,
    title: "Setting",
    icon: "mdi-cogs",
    component: shallowRef(Setting),
  },
]);

const tab = ref<number>(1);

onMounted(() => {
  user
    .getMe()
    .then(() => {
      socket.auth = {
        username: me.value?.username,
      };
      socket.connect();
      user
        .getFreinds()
        .then(() => {
          // console.log(res);
          message
            .getMessages()
            .then(() => {
              // console.log(res);
            })
            .catch((res) => {
              console.log(res);
            });
        })
        .catch((res) => {
          console.log(res);
        });
      // console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
});
</script>

<template>
  <v-app-bar title="Whosapp" rounded app>
    <template v-slot:prepend>
      <v-avatar
        @click="$router.push({ name: 'Profile', params: { username: 'me' } })"
        style="cursor: pointer"
      >
        <v-img :src="me?.avatar || ProfilePhoto" alt="John" cover></v-img>
      </v-avatar>
    </template>
    <template v-slot:append>
      <v-btn rounded icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  <v-main class="" style="min-height: 100vh">
    <v-window v-model="tab" style="min-height: 100%; min-width: 100%">
      <v-window-item v-for="(tab, i) in tabs" :key="i" :value="tab.key">
        <v-container fluid>
          <component :is="tab.component"></component>
        </v-container>
      </v-window-item>
    </v-window>
  </v-main>
  <v-bottom-navigation v-model="tab" grow mode="shift" density="compact">
    <v-btn v-for="(tab, i) in tabs" :key="i" :value="tab.key">
      <v-icon>{{ tab.icon }}</v-icon>
      <span>{{ tab.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped></style>
