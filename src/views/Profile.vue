<script setup lang="ts">
import useUserStore from "@/stores/User";
import ProfilePhoto from "@/assets/profile-image.png";
import { User } from "@/types";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const editBio = ref<boolean>(false);
const isScroll = ref<boolean>(false);

const user = ref<User>({
  phone: ""
} as User);
const route = useRoute();
const { me, freinds } = storeToRefs(useUserStore());
onMounted(() => {
  window.onscroll = () => {
    if (window.scrollY > 150) {
      isScroll.value = true;
    } else {
      isScroll.value = false;
    }
  };

  if (route.params.username == 'me') {
    user.value = me.value!;
  } else {
    user.value = freinds.value?.find((freind) => freind.username == route.params.username)!;
  }
});


</script>
<template>
  <v-app-bar
    title="Whosapp"
    :density="isScroll ? 'comfortable' : 'prominent'"
    rounded
    app
  >
    <template v-slot:image>
      <v-img
        cover
        class=""
        height="200px"
        src="http://unblast.com/wp-content/uploads/2021/09/Real-Estate-Agent-Illustration.jpg"
        gradient="150deg, rgb(185 224 155 / 58%) 0%, rgb(43 120 246 / 52%) 35%, rgb(223 155 142 / 74%) 74%"
      >
      </v-img>
    </template>
    <template v-slot:prepend>
      <v-btn @click="$router.go(-1)" rounded icon="mdi-arrow-left"> </v-btn>

      <v-avatar>
        <v-img
          v-if="isScroll"
          :src="user.avatar || ProfilePhoto"
          alt="John"
        ></v-img>
      </v-avatar>
    </template>
    <template v-slot:append>
      <v-btn rounded icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col
          align-self="start"
          class="d-flex justify-center align-center pa-0"
          cols="12"
        >
          <v-avatar class="avatar-shadow" color="grey" size="164">
            <v-btn class="upload-btn" icon="mdi-camera"> </v-btn>
            <input ref="uploader" class="d-none" type="file" accept="image/*" />
            <v-img
              cover
              :src="user?.avatar || ProfilePhoto"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-list-item color="#0000" class="profile-text-name ma-4 pt-16">
        <v-list-item>
          <v-list-item-title class="text-h6">{{ user?.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ user?.email }}</v-list-item-subtitle>
        </v-list-item>
      </v-list-item>

      <v-card-subtitle class="d-flex align-center gap-2">
        <b class="ml-2">Bio</b>
        <v-btn
          v-if="$route.params.username == 'me'"
          v-on:click="editBio = !editBio"
          size="small"
          icon="mdi-pencil"
          variant="plain"
        >
        </v-btn>
      </v-card-subtitle>

      <p v-if="!editBio" class="pl-6 pr-6 pt-0">
        {{ user?.bio }}
      </p>
      <v-textarea
        v-model="user.bio"
        rows="2"
        v-if="editBio"
        label="Edit bio"
        class="pa-6"
      ></v-textarea>
      <v-spacer></v-spacer>
      <v-text-field
      v-model="user.phone"
        class="pa-6"
        variant="plain"
        prepend-icon="mdi-whatsapp"
        label="Phone"
        :disabled="!editBio"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-row>
        <v-col cols="6" class="text-end">
          <v-list-item class="sutitles">
            <v-list-item-title class="text-h6"> 1002 </v-list-item-title>
            <v-list-item-subtitle class="text-caption"
              >Curtidas</v-list-item-subtitle
            >
          </v-list-item>
        </v-col>
        <v-col cols="6" class="text-start">
          <v-list-item class="sutitles">
            <v-list-item-title class="text-h6"> 10 </v-list-item-title>
            <v-list-item-subtitle class="text-caption"
              >Seguindo</v-list-item-subtitle
            >
          </v-list-item>
        </v-col>
      </v-row>
      <!-- <v-card class="mx-auto bg" elevation="2">
      </v-card> -->
    </v-container>
  </v-main>
</template>
<style scoped>
.upload-btn {
  position: absolute !important;
  z-index: 999;
  top: 121px;
  color: cadetblue;
  background: blueviolet;
  background: rgb(125, 198, 163);
  background: linear-gradient(
    50deg,
    rgba(125, 198, 163, 1) 0%,
    rgba(35, 216, 227, 1) 72%
  );
}

.avatar-shadow {
  box-shadow: 0px 0px 10px 0px rgba(50, 12, 112, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(50, 12, 112, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(50, 12, 112, 0.75);
}
</style>
