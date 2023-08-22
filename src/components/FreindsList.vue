<script setup lang="ts">
import useUserStore from "@/stores/User";
import { IResponseGetProfile } from "@/types/IResponse";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useUserStore();

const { freinds } = storeToRefs(user);

const list = ref<IResponseGetProfile[]>([]);

const onSearch = (e: string) => {
  user
    .getProfile({
      search_key: "username",
      search_value: e,
    })
    .then((res) => {
      list.value.push(res);
    })
    .catch((res) => {
      console.log(res);
    });
};

const select = (e: any) => {
  router.push({ name: "Profile", params: { username: e.id } });
};
</script>
<template>
  <v-combobox
    @update:search="onSearch"
    :items="list"
    item-title="username"
    item-value="username"
    @update:model-value="(e: any) => $router.push({ name: 'Messages', params: { username: e.username }})"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    rounded
  ></v-combobox>
  <v-list
    @click:select="select"
    item-props
    bg-color="transparent"
    select-strategy="single-leaf"
  >
    <v-list-item
      v-for="(item, i) in freinds"
      :key="i"
      :title="item.username"
      rounded="xl"
      :value="item.username"
    >
      <template v-slot:prepend>
        <v-avatar :image="item.avatar"> </v-avatar>
      </template>
      <template v-slot:subtitle>
        <div v-html="item.email"></div>
      </template>
    </v-list-item>
  </v-list>
</template>
<style scoped></style>
