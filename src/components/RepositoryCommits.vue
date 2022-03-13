<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRepository } from '../store/repository';

// DATA
const repository = useRepository();
const commits = ref(repository.commits);
const branches = ref(repository.branches);
const {default_branch} = storeToRefs(repository);
const page = ref(1);

// COMPUTED
const getRepositoryTimeline = computed(()=>{
  return repository.getTimeline;
});
const getBrancheSha = computed(()=>{
  const brancheIndex:number = repository.branches.findIndex(b=>  b.name === default_branch.value);
  return repository.branches[brancheIndex].sha;
});
const isNoCommits = computed(()=>{
  return Object.keys(getRepositoryTimeline.value).length === 0;
});

// METHODS
function addPullReqLink(message:string){
  // for url's => (http|ftp|https)://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?
  const pull = message.match(/([#0-9])\d+/g); // <= for pull requests #ID's
  pull?.forEach(id=>{
    const url = `https://www.github.com/${repository.full_name}/pull/${id.substring(1)}`
    message = message.replace(id,`<a href="${url}" target="_blank" class="text-blue-500">${id}</a>`);
  });
  return message;
}
function fetchCommits(){
  const sha:string = getBrancheSha.value;
  if (sha) {
    repository.fetchCommits(sha); // sha
  }else{
    alert('Ops!! branche not found');
  }
}
function switchBranche(){
  page.value = repository.resetPagination().page;
  fetchCommits()
}
function nextPage(){
  page.value = repository.nextPage();
  fetchCommits();
}
function prevPage(){
  if (page.value>1) {
    page.value = repository.prevPage();
    fetchCommits();
  }
}

// just for #debugging
function print(msg:any){
  console.log(msg);
}
</script>

<template>
  <slot />
  <div class="p-2">
    <svg height="12" width="12" viewBox="0 0 16 16" class="absolute translate-y-3 ml-2 git-branch">
      <path fill-rule="current"
        d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z">
      </path>
    </svg>
    <select v-model="default_branch" @change="fetchCommits()" class="branche-list appearance-none">
      <option v-for="branche in repository.branches" :key="branche.name">{{ branche.name }}</option>
    </select>
  </div>

  <ul class="timeline-list" v-if="!isNoCommits">
    <li v-for="(commits, date) in getRepositoryTimeline" :key="date" class="timeline-item">
      <div class="timeline-item-badge">
        <svg height="16" width="16" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"></path>
        </svg>
      </div>
      <span class="timeline-item-title">Commit on  {{ $dayjs(date).format('MMM D, YYYY') }} </span>
      <ul class="commit-list">
        <li v-for="(commit,j) in commits" :key="j" class="commit-item" :set="isDescriptionOpen = ref(false)">
          <h3 class="commit-msg" v-html="addPullReqLink(commit.message)"></h3>
          <button v-if="commit.description" @click="isDescriptionOpen = !isDescriptionOpen; print(isDescriptionOpen)" class="-translate-y-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-sm mx-2 px-3 pb-1 scale-75">...</button>
          <pre v-show="isDescriptionOpen" class="text-xs pl-2 text-gray-500">{{ commit.description }}</pre>
          <br>
          <img :src="commit.author?.avatar_url" :alt="commit.author?.login || '@unknown!'" class="commit-avatar">
          <strong class="commit-username">{{ commit.author?.login || commit.author?.name }}</strong>
          <span class="commit-time">commited {{ $dayjs(commit.date).fromNow() }}</span>
        </li>
      </ul>
    </li>
  </ul>
  <!-- octocat loading icon -->
  <div v-else class="px-64 py-24 text-center drop-shadow-sm animate-pulse">
    <svg class="w-full h-auto fill-youcan-50 hover:drop-shadow duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    <h1 class="m-6 font-bold text-gray-200">No Commits</h1>
  </div>
  <!-- Pagination Buttons -->
  <div class="w-full flex justify-center" v-if="!isNoCommits || (isNoCommits && page > 1)">
    <button @click="prevPage()" class="py-2 px-4 border rounded-l bg-gray-100 hover:bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed" :disabled="page===1">Oldest</button>
    <button @click="nextPage()" class="py-2 px-4 border rounded-r bg-gray-100 hover:bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed" :disabled="isNoCommits">Newest</button>
  </div>
</template>

<style lang="scss">
.branche-list {
  @apply p-2 pl-6 rounded bg-gray-200;
}
.timeline-list{
  @apply ml-8 list-none relative;
  @apply before:content-[''] before:absolute before:block before:bg-gray-100 before:rounded before:py-16 before:w-1 before:h-full before:-translate-y-2 before:-translate-x-3 before:-ml-px;
  .timeline-item{
    @apply relative pl-4 marker:text-youcan-300;
    .timeline-item-badge{
      @apply absolute -translate-x-9 translate-y-1 -mb-px border border-white bg-white rounded-full;
    }
    .timeline-item-title{
      @apply text-gray-500;
    }
    &:hover{
      .timeline-item-badge{
        @apply bg-transparent border-gray-50 fill-youcan-700 scale-110 duration-500;
      }
    }
    &:first-child{
      .commit-item:first-child{
        @apply bg-youcan-50;
      }
    }
  }
}

.commit-list{
  @apply rounded-lg overflow-hidden divide-y divide-gray-200 border ml-4 my-4;
  .commit-item{
    @apply pt-3 pl-4 pb-1 text-sm;
    .commit-msg{
      @apply inline-block font-bold text-lg -mb-2;
    }
    .commit-avatar{
      @apply h-6 w-6 rounded-full border border-white p-px inline-block;
    }
    .commit-username{
      @apply font-bold px-1 mr-2 align-middle;
    }
    .commit-time{
      @apply text-gray-500 align-middle;
    }
    &:hover{
      @apply bg-gray-50;
    }
  }
  .commit-item-selected{
    @apply bg-gray-100;
    &:hover{
      @apply bg-gray-100;
    }
  }
}


</style>
