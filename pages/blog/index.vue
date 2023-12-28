<template>
  <div class="py-[50px]">
    <div class="max-w-[850px] mx-auto mb-[40px]">
      <h1 class="text-center heading-2 mb-[20px]">
        {{ pageData.title }}
      </h1>
      <p class="text-center">
        {{ pageData.description }}
      </p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[40px]">
      <BlogPost
        v-for="post in pagedPosts"
        :key="post._path"
        :post="post"
      />
    </div>
    <section v-if="hasPaginatinon" id="next">
      <PaginationControls
        :page-number="pageNumber"
        :number-of-pages="numberOfPages"
        :url-prefix="urlPrefix"
      />
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blog' });

const pageData = await queryContent('blog').where({ _path: '/blog' }).findOne();
const pageSize = pageData.pagination.size || 9;
const pagedPosts = await queryContent('blog')
  .where({
    _path: { $ne: '/blog' }
  })
  .only(['title', 'thumbImg', 'tags', '_path', 'content'])
  .sort({ createdAt: 'asc' })
  .limit(pageData.pagination.size)
  .find();

const pageNumber = 1;

const allPosts = await queryContent('blog')
  .where({ _path: { $ne: '/blog' } })
  .only(['title'])
  .find();
const numberOfPosts = allPosts.length;
const numberOfPages = Math.ceil(numberOfPosts / pageSize);

const hasPaginatinon = numberOfPages > 1;

const urlPrefix = 'blog';

</script>
