<template>
  <section :id="block.id" :style="{ background: `url(${block.background}) top center no-repeat`, backgroundSize: '100%' }" :data-cms-bind="dataBinding" class="pt-[140px] sm:pt-[50px]">
    <div class="container">
      <div class="grid sm:grid-cols-2 gap-[50px] items-center">
        <div>
          <img :src="block.image" :alt="block.image_alt">
        </div>
        <div>
          <h2 class="heading-2 mb-4">
            {{ block.title }}
          </h2>
          <!-- eslint-disable -->
          <div class="mb-[10px]" v-html="block.description" />
          <!-- eslint-enable -->
          <div class="flex lg:gap-0 gap-[20px] flex-col-reverse lg:flex-row items-start lg:items-center justify-between">
            <NuxtLink :to="block.button.url" class="custom-btn">
              {{ block.button.text }}
            </NuxtLink>
            <img :src="block.signature" :alt="block.signature_alt">
          </div>
        </div>
      </div>
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

<style lang="scss" scoped>

</style>
