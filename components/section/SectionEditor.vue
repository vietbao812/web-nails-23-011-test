<template>
  <section :id="block.id" :data-cms-bind="dataBinding" class="py-[50px]">
    <div class="container">
      <!-- eslint-disable -->
      <div v-html="block.content" />
      <!-- eslint-enable -->
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

defineProps<Props>()
</script>
