<script setup lang="ts">
import { ref } from 'vue';
import RepositoryCommits from './RepositoryCommits.vue';
const repos = ['Repository A', 'Repository B', 'Repository C', 'Repository D'];
const selectedRepo = ref(0);
</script>

<template>
  <section class="hero gradient-bg">
    <header class="header">
      <!-- <h1>YouCan Coding Challeng</h1> -->
      <div class="profile">
        <span class="username">Bilal Hafri</span>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="hafribilal" class="avatar">
      </div>
    </header>
    <div class="search">
      <input type="text" placeholder="Start searching by name..." class="search-box">
      <select class="search-option">
        <option value="">Name</option>
      </select>
    </div>
  </section>
  <section class="content">
    <aside class="aside">
      <ul class="list-item">
        <li v-for="(repo, index) in repos"
            :key="index"
            class="item"
            :class="selectedRepo === index ? 'item-selected' : null"
            @click="selectedRepo = index">{{repo}}</li>
      </ul>
    </aside>
    <main class="commits">
      <RepositoryCommits>
        <h1 class="repo-title">{{ repos[selectedRepo] }}</h1>
      </RepositoryCommits>
    </main>
  </section>
</template>

<style lang="scss">
  .hero{
    @apply w-full flex flex-col items-center bg-youcan-500 select-none;
  }
  .gradient-bg{
    @apply bg-gradient-to-r from-youcan-600 via-youcan-500 to-youcan-400;
  }
  .header{
    @apply w-full flex justify-end items-center p-6;
  }
  .profile {
    .avatar{
      @apply rounded-full h-8 w-8 p-1 border inline-block;
    }
    .username{
      @apply font-bold text-white mx-2 align-middle;
    }
  }
  .search{
    @apply p-24 w-full flex justify-center;
    .search-box{
      @apply text-lg rounded p-2 w-1/2 mx-2;
    }
    .search-option{
      @apply text-lg font-bold rounded p-2 w-1/12;
    }
  }

  .content{
    @apply mt-6 w-1/2 flex gap-2 select-none mb-14;
  }
  .aside{
    @apply w-3/12 h-full;
    .list-item{
      @apply rounded-lg bg-gray-50 divide-y divide-gray-200 overflow-hidden shadow;
      .item{
        @apply py-2 pl-4 truncate cursor-pointer;
        &:hover{
          @apply bg-youcan-200;
        }
      }
      .item-selected{
        @apply bg-youcan-400 font-bold text-white;
        &:hover{
          @apply bg-youcan-400;
        }
      }
    }
  }
  .commits{
    @apply flex-1 p-2 rounded-lg bg-white shadow;
    .repo-title{
      @apply text-4xl font-bold m-4;
    }
  }
</style>
