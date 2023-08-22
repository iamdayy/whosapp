<script setup lang='ts'>
import { onMounted } from 'vue';
import useAuthStore from './stores/Auth';
const auth = useAuthStore();
onMounted(() => {
  auth.onInit();
})</script>
<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>
<style scoped></style>