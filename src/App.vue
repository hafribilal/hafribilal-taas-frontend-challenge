<script setup lang="ts">

</script>

<template>

    <router-view v-slot="{ Component }">

      <transition name="fade" mode="out-in">
        <main class="root mb-auto">
          <component :is="Component"/>
        </main>
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

.fade-enter-active, .fade-leav-active{
  @apply transition duration-300 ease-in-out opacity-50;
}
</style>
