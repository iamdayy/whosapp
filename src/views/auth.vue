<script setup lang="ts">
import { Tabs } from "@/types";
import { ref } from "vue";
import LoginComponent from "@/components/Login.vue";
import RegisterComponent from "@/components/Register.vue";
import LoginImage from "@/assets/login.svg";
import RegisterImage from "@/assets/sign_up.svg";
import { shallowRef } from "vue";

const tabs = ref<Tabs[]>([
  {
    key: 0,
    title: "Signin",
    icon: "mdi-login",
    component: shallowRef(LoginComponent),
  },
  {
    key: 1,
    title: "Signup",
    icon: "mdi-account-plus",
    component: shallowRef(RegisterComponent),
  },
]);
const tab = ref<number>(0);
</script>
<template>
  <v-container fluid>
    <div class="d-flex align-center justify-center">
      <div class="d-flex w-100 justify-center align-center pa-4">
        <v-img
          :src="tab == 0 ? LoginImage : RegisterImage"
          style="max-width: 40%"
        ></v-img>
        <h1 class="text-h1 font-weight-thin hidden-md-and-down">
          {{ tab == 0 ? "Signin" : "Signup" }}
        </h1>
      </div>
    </div>
    <v-tabs v-model="tab" align-tabs="center" grow>
      <v-tab v-for="(item, i) in tabs" :key="i" :value="item.key"
        ><span class="hidden-md-and-down">{{ item.title }}</span>
        <v-icon :icon="item.icon"></v-icon
      ></v-tab>
    </v-tabs>
    <v-main>
      <v-window v-model="tab" direction="vertical">
        <v-window-item v-for="(item, i) in tabs" :key="i" :value="item.key">
          <v-container fluid>
            <component :is="item.component"></component>
          </v-container>
        </v-window-item>
      </v-window>
    </v-main>
  </v-container>
</template>
<style scoped></style>
