<template>
  <section :id="block.id" :data-cms-bind="dataBinding" class="pt-[45px]">
    <div class="container">
      <div class="gallery grid grid-rows-2 gap-[20px]">
        <div v-for="item in block.gallery" :key="item" class="gallery_item relative">
          <img :src="item.image" :alt="item.image_alt" class="w-full h-full object-cover">
          <span class="absolute bottom-0 right-0 bg-main text-white rounded-tl-[12px] px-[27px] py-[8px] text-[17px] leading-none font-extrabold">
            {{ item.tag }}
          </span>
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
.gallery {
  grid-template-columns: repeat(24, minmax(0, 1fr));;
  .gallery_item {
    grid-row: span 1 / span 1;
    grid-column: span 6 / span 6;
    &:nth-child(1) {
      grid-row: span 2 / span 2;
      grid-column: span 8 / span 8;
    }
    &:nth-child(5n - 3),
    &:nth-child(5n) {
      grid-row: span 1 / span 1;
      grid-column: span 10 / span 10;
    }
  }
}
@media (max-width: 640px) {
  .gallery {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    .gallery_item {
      grid-column: span 1 / span 1 !important;
    }
  }
}
</style>
