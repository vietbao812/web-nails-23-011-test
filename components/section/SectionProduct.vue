<template>
  <section :id="block.id" :data-cms-bind="dataBinding" class="pt-[80px] pb-[70px]">
    <div class="container">
      <h2 class="heading-2 text-center mb-3">
        <span>{{ block.title_highlight }}</span>
        <span class="ml-[16px]">{{ block.title }}</span>
      </h2>
      <div class="flex sm:flex-row flex-col items-start sm:items-center justify-center gap-2 sm:gap-6 mb-6 sm:mb-[60px] border-b border-[#E4E4E4]">
        <div v-for="(product, index) in mappedProducts" :key="index">
          <span :class="product.active ? 'border-b-[3px] border-main' : ''" class="cursor-pointer text-[22px] font-bold leading-[30px]" @click="changeTabProduct(product)">
            {{ product.category }}
          </span>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        <div v-for="(product_item, index) in productTabActive.list" :key="index">
          <div class="aspect-[16/9] mb-[16px]">
            <img :src="product_item.image" :alt="product_item.image_alt" class="w-full object-cover">
          </div>
          <div class="text-main italic font-medium mb-[8px]">
            {{ product_item.tag }}
          </div>
          <h4 class="heading-4 mb-[12px]">
            {{ product_item.title }}
          </h4>
          <div class="heading-4 !font-bold text-main mb-[14px]">
            {{ product_item.price }}
          </div>
          <div class="inline-flex items-center gap-[8px] px-[8px] bg-main rounded-[16px] text-white cursor-pointer text-[14px]" @click="addToCart(product_item)">
            <span>
              <img :src="block.button.icon" :alt="block.button.icon_cart" class="w-[20px]">
            </span>
            <span>{{ block.button.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();

interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>()
const products = ref(props.block.product.map((item: any, index: number) => {
  return {
    ...item,
    active: index === 0
  }
}));

const mappedProductList = ref<any>([]);
const productList = computed(() => products.value.reduce((acc: any, item: any) => [...acc, ...item.list], []));

const convertTitleToSlug = (title: string, list: any) => {
  let slug = title.toLowerCase().replace(/ /g, '-');
  let count = 1;

  while (list.some((item: any) => item.slug && item.slug === slug)) {
    slug = title.toLowerCase().replace(/ /g, '-') + `-${count}`;
    count++;
  }
  count = 1;

  return slug;
}

const handleInitMappedProductList = () => {
  productList.value.forEach((product: any) => {
    const slug = convertTitleToSlug(product.title, mappedProductList.value);
    mappedProductList.value.push({ ...product, slug });
  });
}

watch(() => productList.value, handleInitMappedProductList, { immediate: true, deep: true });

const mappedProducts = computed(() => {
  let indexItem = 0;
  return products.value.map((item: any) => {
    const result = {
      ...item,
      list: mappedProductList.value.slice(indexItem, indexItem + item.list.length)
    };
    indexItem += item.list.length;
    return result;
  });
});

const changeTabProduct = (product: any) => {
  products.value = products.value.map((item: any) => {
    return {
      ...item,
      active: item.category === product.category
    }
  })
}

const productTabActive = computed(() => {
  return mappedProducts.value.find((item: any) => item.active)
})

const toast = useToast()
const addToCart = (productItem: any) => {
  cartStore.addToCart(productItem);
  toast.add({
    title: 'Update cart',
    description: 'Add product to cart successfully!.',
    color: 'green'
  })
}

</script>

<style lang="scss" scoped>

</style>
