<script setup lang='ts'>
import { ref } from 'vue';

const emit = defineEmits(['onSubmit']);

const props = defineProps({
  image: String || null,
});
const text = ref<string>("");

const submit = (status: boolean, value?: string) => {
    emit('onSubmit', { status, value })
}

</script>
<template>
    <v-card width="100%" class="absolute pa-3" style="margin-right: auto; margin-left: auto;">
        <v-card-text class="d-flex pa-6">
            <v-img :src="props.image"></v-img>
        </v-card-text>
        <v-card-actions>
            <!-- <v-btn variant="tonal" color="error" @click="submit(false)"><v-icon icon="mdi-close"></v-icon></v-btn> -->
            <v-text-field
              v-model="text"
              append-icon="mdi-send"
              prepend-inner-icon="mdi-emoticon-outline"
              rounded="lg"
              density="compact"
              variant="outlined"
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
              @click:append="submit(true, text)"
              @keyup.enter="submit(true, text)"
            ></v-text-field>
            <!-- <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit(true, text)"><v-icon icon="mdi-check"></v-icon></v-btn> -->
        </v-card-actions>
    </v-card>
</template>
<style scoped></style>