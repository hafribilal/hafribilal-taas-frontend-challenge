<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  watch,
  ref
} from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
  show: Boolean, // true / false
  type: String, // [ success, warnning, info, ... ]
  duration: Number // 500ms
});

function close(){
  emit('close');
}

watch(
  ()=>props.show,
  ()=>{
    if (props.show) {
      setTimeout( ()=> close(), props.duration || 5000);
    }
  }
);

</script>

<template>
  <transition name="alert">
    <div v-if="props.show" class="alert-container">
      <div class="alert rounded-md p-4" :class="props.type === 'success'?'bg-green-50':'bg-red-100'">
        <div class="flex">

          <div v-if="props.type === 'success'" class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" x-description="Heroicon name: solid/check-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div v-else class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" x-description="Heroicon name: solid/x-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>

          <div class="ml-3">
            <p class="text-sm font-medium" :class="props.type === 'success'?'text-green-800':'text-red-800'">
              <slot name="title"></slot>
            </p>
          </div>

          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button @click="close()"
                      class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="props.type === 'success'?'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600':'bg-red-100 text-red-500 hover:bg-red-50 focus:ring-offset-red-50 focus:ring-red-600'">
                <span class="sr-only">Dismiss</span>
                <svg class="h-5 w-5" x-description="Heroicon name: solid/x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.alert-enter-active,
.alert-leave-active {
  @apply transition ease-in-out delay-150 duration-300;
}

.alert-enter-from,
.alert-leave-active {
  @apply -translate-y-full
}
.alert-container {
    @apply absolute top-0 max-w-lg mx-auto py-4 px-4 sm:px-6 px-8;
}
.alert {
    @apply shadow;
}
</style>
