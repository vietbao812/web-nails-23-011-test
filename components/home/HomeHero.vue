<template>
  <section :id="block.id" :style="{ background: `url(${block.background}) center center no-repeat`, backgroundSize: '100% 100%' }" class="section-home-banner relative" :data-cms-bind="dataBinding">
    <div class="grid lg:grid-cols-[3fr_4fr]">
      <div class="lg:pt-[55px] px-[30px]">
        <div class="lg:max-w-[495px] ml-auto">
          <h1 class="heading-1 text-white mb-6">
            {{ block.title }}
          </h1>
          <!-- eslint-disable -->
          <div class="text-white mb-4 pr-[50px]" v-html="block.description" />
          <!-- eslint-enable -->
          <NuxtLink class="custom-btn mb-[60px] sm:mb-[150px]" :to="block.button.url">
            {{ block.button.text }}
          </NuxtLink>
        </div>
      </div>
      <div class="bg-main">
        <div class="mt-[-200px]">
          <img :src="block.image" :alt="block.image_alt" class="max-w-[899px] sm:translate-x-[-70px] translate-y-[140px] relative z-[1] w-full sm:w-[calc(100%+70px)]">
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

<style lang="scss" scoped></style>
