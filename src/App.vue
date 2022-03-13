<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="hello" mode="out-in">
      <Suspense>
        <main class="root mb-auto">
          <component :is="Component"/>
        </main>
        <template #fallback>
          <div class="h-full w-full mb-auto flex justify-center items-center text-black text-xl">
            Loading...
          </div>
        </template>
      </Suspense>
    </transition>
    <footer class="footer">
      coded with ❤️ for <strong class="font-bold">YouCan</strong>
    </footer>
  </router-view>
</template>

<style>
.root{
  @apply w-screen max-h-full min-h-screen m-0 p-0 flex flex-col items-center bg-youcan-50;
}
.footer{
  @apply w-full text-center p-2 -mt-12 text-youcan-600;
}

/* .fade-enter-active,
.fade-leave-active {
  @apply transition ease-in-out delay-150 duration-300;
}

.fade-enter-from,
.fade-leave-active {
  @apply -translate-y-2 opacity-50
} */

.hello-enter-active,
.hello-leave-active {
  @apply transition ease-in-out delay-150 duration-300;
}

.hello-enter-from,
.hello-leave-to {
  @apply -translate-y-full
}
</style>
