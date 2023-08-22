<script setup lang="ts">
import useAuthStore from "@/stores/Auth";
import { IMethodRegister } from "@/types/IMethods";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const form = ref<IMethodRegister>({
  name: {
    first: "",
    last: "",
  },
} as IMethodRegister);

const rules = ref({
          required: (value: any) => !!value || 'Required.',
          email: (value: string) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          password: (value: string) => {
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
            return pattern.test(value) || "password must be eight characters including one uppercase letter and alphanumeric characters"
          },
          passVerify: (value: string) => {
            return value == form.value.password || "Password must be same"
          }
        })

const passwordVerify = ref<string>("");

const passwordmatch = () => {
  if (passwordVerify.value !== form.value.password) {
    return false;
  }
  return true;
};

const register = async () => {
  if (passwordmatch()) {
    try {
      const data = await auth.register(form.value);
      console.log(data);
      router.push({ name: "Auth" })
    } catch (error: any) {
      console.log(error);
    }
  }
};
</script>
<template>
  <v-form class="pa-3">
    <v-text-field
      v-model="form.username"
      prepend-inner-icon="mdi-account-outline"
      :rules="[rules.required]"
      label="username"
      variant="outlined"
      rounded
    ></v-text-field>
    <div class="d-flex wrap">
      <v-text-field
        class="mr-2"
        v-model="form.name.first"
        prepend-inner-icon="mdi-badge-account-horizontal-outline"
        label="first"
        variant="outlined"
        rounded
      ></v-text-field>
      <v-text-field
        class="ml-2"
        v-model="form.name.last"
        prepend-inner-icon="mdi-badge-account-horizontal-outline"
        label="last"
        variant="outlined"
        rounded
      ></v-text-field>
    </div>
    <v-text-field
      v-model="form.email"
      :rules="[rules.email]"
      prepend-inner-icon="mdi-at"
      label="email"
      variant="outlined"
      rounded
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="form.phone"
      prepend-inner-icon="mdi-phone"
      label="phone"
      variant="outlined"
      rounded
      type="tel"
    ></v-text-field>
    <v-text-field
      v-model="form.password"
      :rules="[rules.password]"
      prepend-inner-icon="mdi-form-textbox-password"
      label="password"
      variant="outlined"
      rounded
      type="password"
    ></v-text-field>
    <v-text-field
      v-model="passwordVerify"
      :rules="[rules.passVerify]"
      prepend-inner-icon="mdi-form-textbox-password"
      label="verify password"
      variant="outlined"
      rounded
      type="password"
    ></v-text-field>
  </v-form>
  <v-btn block rounded @click="register"
    >Register <v-icon icon="mdi-account-plus"></v-icon
  ></v-btn>
</template>
<style scoped></style>
