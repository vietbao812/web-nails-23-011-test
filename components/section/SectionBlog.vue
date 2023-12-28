<template>
  <Section :id="block.id" :data-cms-bind="dataBinding" class="pt-[80px] pb-[55px]">
    <div class="container">
      <h2 class="heading-2 text-center mb-[38px]">
        <span>{{ block.title_highlight }}</span>
        <span class="ml-[16px]">{{ block.title }}</span>
      </h2>
      <div class="grid sm:grid-cols-3 gap-x-[20px] gap-y-[40px] mb-[40px]">
        <BlogPost
          v-for="post in pagedPosts"
          :key="post._path"
          :post="post"
        />
      </div>
      <div class="flex items-center justify-center">
        <NuxtLink :to="block.button.url" class="custom-btn">
          {{ block.button.text }}
        </NuxtLink>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

defineProps<Props>()

const pagedPosts = await queryContent('blog')
  .where({
    _path: { $ne: '/blog' }
  })
  .only(['title', 'thumbImg', 'tags', '_path', 'description', 'content'])
  .sort({ createdAt: -1 })
  .limit(3)
  .find();
</script>

<style lang="scss" scoped>

</style>
