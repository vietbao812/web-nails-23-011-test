<template>
  <div>
    <MainHeader />
    <div class="container">
      <slot />
    </div>
    <MainFooter />
  </div>
</template>

<script lang="ts" setup>
// const route = useRoute();
// const pageData = await queryContent('blog').where({ _path: '/blog' }).findOne();
// const head = generateHead(pageData, route);

// useHead(head);
</script>
