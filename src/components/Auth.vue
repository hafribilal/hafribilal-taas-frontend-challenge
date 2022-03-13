<script setup lang="ts">
import { ref, watch } from 'vue';
import router from '../router'
import { useUser } from '../store/user';
import { default as TheAlert } from './TheAlert.vue';

const isLoading = ref(false);
const user = useUser();
const authId = ref(user.authId);
const isAlertOpned = ref(false);

async function connect(){
  isLoading.value = true;
  setTimeout(async()=> {
    await user.connect();
    if (user.isConnected) {
      console.log('hello');
      router.push({name:'repos'});
    }else{
      isAlertOpned.value = true;
    }
    isLoading.value = false;
  }, 300);
}
</script>

<template>
  <teleport to="main">
    <TheAlert :show="isAlertOpned" :type="'error'" :duration="5000" @close="isAlertOpned = false">
      <template #title><strong>Ops!! </strong> Connection Denied</template>
    </TheAlert>
  </teleport>
  <section class="container">
    <button type="button"
            class="oauth-btn"
            @click.prevent="connect()">
            <span v-if="!isLoading">
              Authorize my Github Account
            </span>
            <span v-else>
              <svg class="processing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
    </button>
  </section>
</template>

<style lang="scss" scoped>
.container{
  @apply m-0 w-screen h-screen flex flex-col flex-1 justify-center items-center p-6;
}
.oauth-btn{
  @apply p-6 bg-youcan-500 rounded-lg font-bold text-white shadow hover:shadow-lg;
  @apply hover:scale-110 transition duration-150 ease-in-out;
}
.processing{
  @apply motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block;
}
</style>
