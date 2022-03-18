<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { default as RepositoryCommits } from './RepositoryCommits.vue';
import { default as TheAlert } from './TheAlert.vue';
import { useUser } from '../store/user';
import { useRepository, repository as _repository } from '../store/repository';

const user = useUser();
const repository = useRepository();

const selectedRepo = ref(0);
const isAlertOpned = ref(false);
const isLoading = ref(false);

const search = ref('');
const search_option = ref('name');

// COMPUTED
const getRepoTitles = computed<Array<{id:number, name:string}>>(()=>{
  return user.search(search.value, search_option.value)
      .map(repo=> {
        return {
          id:repo.id,
          name:repo.name
        };
      });
});

// METHODS
async function openRepo(id:number){
  repository.setRepositoryById(id);
}
function openAlert(){
  console.log('open alert');
  isAlertOpned.value = true;
}
function closeAlert(){
  console.log('close alert');
  isAlertOpned.value = false;
}

await user.fetchProfile();
user.fetchRepositories();


onMounted(()=>{
  setTimeout(()=>openAlert(),1500);
  setTimeout(()=>{
    isLoading.value = false;
  },500);
})
</script>

<template>
  <teleport to="main">
    <TheAlert :show="isAlertOpned" :type="'success'" :duration="3000" @close="closeAlert()">
      <template #title>Your Github account was successfully authorized</template>
    </TheAlert>
  </teleport>
  <section class="hero gradient-bg">
    <header class="header">
      <!-- <h1>YouCan Coding Challeng</h1> -->
      <div class="profile">
        <span class="username">{{ user.name || user.login }}</span>
        <img :src="user.avatar_url" :alt="user.getUsername" class="avatar">
      </div>
    </header>
    <div class="search">
      <input type="text" v-model="search" placeholder="Start searching by name..." class="search-box">
      <select v-model="search_option" class="search-option">
        <option value="name">Name</option>
      </select>
    </div>
  </section>
  <section class="content">
    <aside class="aside">
        <ul v-if="!isLoading && getRepoTitles.length > 0" class="repository-list">
            <li v-for="(repo, index) in getRepoTitles"
                :key="repo.id"
                class="item"
                :class="selectedRepo === index ? 'item-selected' : null"
                @click="selectedRepo = index; openRepo(repo.id)">{{repo.name}}</li>
        </ul>
        <ul v-else class="repository-list">
          <li v-for="(i,j) in 5" :key="j*5" class="repository-item p-4 flex">
            <strong class="border animate-pulse bg-gray-200 rounded-full flex-1 p-1"></strong>
          </li>
        </ul>
    </aside>
    <section class="commits">
      <suspense>
        <RepositoryCommits>
          <h1 class="repo-title">{{ repository.name }}</h1>
        </RepositoryCommits>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    </section>
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
    @apply mt-6 w-3/5 flex gap-2 select-none mb-14;
  }
  .aside{
    @apply w-1/4 h-full;
    .repository-list{
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
    @apply min-h-fit w-3/4 p-2 rounded-lg bg-white shadow;
    .repo-title{
      @apply text-4xl font-bold m-4;
    }
  }
</style>
