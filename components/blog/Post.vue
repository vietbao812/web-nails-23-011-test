<template>
  <article>
    <NuxtLink :to="post._path" class="rounded-[28px] overflow-hidden">
      <img :src="post.thumbImg.image" :alt="post.thumbImg.image_alt">
    </NuxtLink>
    <div class="mt-[28px]">
      <h3 class="text-[24px] leading-[26px] font-bold mb-[12px] h-[52px] post-title">
        <NUxtLink :to="post._path">
          {{ post.title }}
        </NUxtLink>
      </h3>
      <!-- eslint-disable -->
      <div v-html="post.content" class="text-expert" />
      <!-- eslint-enable -->
    </div>
  </article>
</template>

<script lang="ts" setup>
interface Props {
  post: any
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.post-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.text-expert {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
