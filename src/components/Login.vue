<script setup lang='ts'>
import useAuthStore from '@/stores/Auth';
import { IMethodLogin } from '@/types/IMethods';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref<IMethodLogin>({} as IMethodLogin);
const auth = useAuthStore();
const router = useRouter();
const login = async () => {
    try {
        const data = await auth.login(form.value);
        console.log(data);
        router.push({ name: "Home" })
    } catch (error: any) {
        console.log(error);
    }
}
</script>
<template>
    <v-form>
        <v-text-field v-model="form.username" prepend-inner-icon="mdi-account-outline" label="Username" variant="outlined" rounded></v-text-field>
        <v-text-field v-model="form.password" prepend-inner-icon="mdi-form-textbox-password" type="password" label="Password" variant="outlined" rounded></v-text-field>
    </v-form>
    <v-btn block rounded @click="login">Login <v-icon icon="mdi-login"></v-icon></v-btn>
</template>
<style scoped></style>