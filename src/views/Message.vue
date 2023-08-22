<script setup lang="ts">
import useMessageStore from "@/stores/Message";
import useUserStore from "@/stores/User";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

const message = useMessageStore();
const user = useUserStore();
const route = useRoute();
const { me } = storeToRefs(user);
const { getMessageByUser } = storeToRefs(message)

const msg = ref<string>("");

const send = async () => {
  await message.createMessage({
    body: {
      text: msg.value,
      image: msg.value
    },
    from: me.value?.username!,
    to: route.params.username as string,
  });
  msg.value = "";
};

</script>
<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$router.push('/')">
      <v-icon color="white">mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>

    <v-toolbar-title class="white--text">{{ $route.params.username }}</v-toolbar-title>

    <template v-slot:append>
      <v-btn rounded icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  <v-main>
    <v-container fluid>
      <v-row class="fill-height pb-14" align="end">
        <v-col>
          <div
            v-for="(item, index) in getMessageByUser($route.params.username as string)"
            :key="index"
            :class="[
              'd-flex flex-row align-center my-2',
              item.from == 'user' ? 'justify-end' : null,
            ]"
          >
            <span v-if="item.formself" class="blue--text mr-3">{{
              item.body.text
            }}</span>
            <v-avatar :color="item.from == 'user' ? 'indigo' : 'red'" size="36">
              <span class="white--text">{{ item.from[0] }}</span>
            </v-avatar>
            <span v-if="!item.formself" class="blue--text ml-3">{{
              item.body.text
            }}</span>
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
              v-model="msg"
              :append-icon="msg ? 'mdi-send' : 'mdi-microphone'"
              roundedz
              variant="outlined"
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
              @click:append="send"
              @keyup.enter="send"
            ></v-text-field>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-footer>
</template>
<style scoped></style>
