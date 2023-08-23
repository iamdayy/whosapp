<script setup lang="ts">
import useUserStore from "@/stores/User";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import ProfilePhoto from "@/assets/profile-image.png"

const user = useUserStore();
const { freinds } = storeToRefs(user)
const router = useRouter();
const select = (e: any) => {
  router.push({ name: "Messages", params: { username: e.id } });
};

</script>
<template>
  <v-list
    @click:select="select"
    item-props
    lines="three"
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
        <v-avatar :image="item.avatar || ProfilePhoto"> </v-avatar>
      </template>
      <template v-slot:subtitle>
        <div v-html="item.email"></div>
      </template>
    </v-list-item>
  </v-list>
</template>
<style scoped></style>
