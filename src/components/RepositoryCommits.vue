<template>
<slot></slot>
<div class="p-2">
  <svg height="16" width="16" viewBox="0 0 16 16" class="absolute translate-y-3 ml-2 git-branch">
    <path fill-rule="current"
      d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z">
    </path>
  </svg>
  <select class="branche-list">
    <option>master</option>
  </select>
</div>

<ul class="timeline-list">
  <li v-for="i in 5" :key="i" class="timeline-item">
    <div class="timeline-item-badge">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-git-commit">
          <path fill-rule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"></path>
      </svg>
    </div>
    <span class="timeline-item-title">Commit on Mars 2, 2021</span>
    <ul class="commit-list">
      <li class="commit-item commit-item-selected">
        <h3 class="commit-msg">DARK: Fix missing content</h3>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="othmandev" class="commit-avatar">
        <strong class="commit-username">OthmanDev</strong>
        <span class="commit-time">commited 16 hours ago</span>
      </li>
      <li class="commit-item">
        <h3 class="commit-msg">DARK: Fix missing content</h3>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="othmandev" class="commit-avatar">
        <strong class="commit-username">OthmanDev</strong>
        <span class="commit-time">commited 16 hours ago</span>
      </li>
    </ul>
  </li>
</ul>
</template>

<style lang="scss">
.branche-list {
  @apply p-2 pl-6 rounded bg-gray-200;
}
.timeline-list{
  @apply ml-8 list-none relative;
  @apply before:content-[''] before:absolute before:block before:bg-gray-100 before:rounded before:py-24 before:w-1 before:h-full before:-translate-y-2 before:-translate-x-3 before:-ml-px;
  .timeline-item{
    @apply relative pl-4 marker:text-youcan-300;
    .timeline-item-badge{
      @apply absolute -translate-x-9 translate-y-1 -mb-px border border-white bg-white rounded-full;
    }
    .timeline-item-title{
      @apply text-gray-500;
    }
    &:hover{
      @apply list-disc;
      .timeline-item-badge{
        @apply bg-transparent border-gray-50;
      }
    }
  }

}

.commit-list{
  @apply rounded-lg overflow-hidden border ml-6 my-4;
  .commit-item{
    @apply p-2 text-sm cursor-pointer;
    .commit-msg{
      @apply block font-bold text-lg mb-1;
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
