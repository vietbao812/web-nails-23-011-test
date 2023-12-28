<template>
  <header :style="{ background: headerData.background }" class="text-black z-[99999] w-full sticky top-0">
    <div class="container mx-auto">
      <nav class="flex items-center gap-[30px] justify-between lg:h-[162px]">
        <div class="lg:hidden block py-[27px]">
          <!-- eslint-disable -->
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" @click="isOpen = true">
            <path d="M6.25 37.5H43.75V33.3333H6.25V37.5ZM6.25 27.0833H43.75V22.9167H6.25V27.0833ZM6.25 12.5V16.6667H43.75V12.5H6.25Z" fill="white" />
          </svg>
          <!-- eslint-enable -->
        </div>
        <div>
          <NuxtLink to="/">
            <img v-if="headerData.logo" :src="headerData.logo" alt="logo" class="sm:max-w-[200px]">
          </NuxtLink>
        </div>
        <div class="hidden lg:grid grid-cols-[1fr_45px] gap-[40px] items-center">
          <ul class="flex items-center h-full gap-[20px]">
            <li v-for="item in headerData.nav" :key="item.link">
              <NuxtLink
                class="block cursor-pointer"
                @click="changePath(item.link)"
              >
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
          <div class="lg:block hidden cursor-pointer relative">
            <img src="/images/mdi_cart.svg" alt="icon cart" class="w-[25px]">
            <div class="absolute bottom-[-10px] right-[10px] bg-white w-[20px] h-[20px] rounded-full text-[12px] flex items-center justify-center">
              {{ countListCart }}
            </div>
          </div>
        </div>
        <div class="lg:hidden cursor-pointer relative">
          <img src="/images/mdi_cart.svg" alt="icon cart" class="w-[25px] min-w-[25px]">
          <div class="absolute bottom-[-10px] right-[10px] bg-white w-[20px] h-[20px] rounded-full text-[12px] flex items-center justify-center">
            {{ countListCart }}
          </div>
        </div>
      </nav>
    </div>
    <div class="lg:hidden block">
      <USlideover v-model="isOpen" class="nav-mobile">
        <div class="p-4 flex-1 relative">
          <div class="absolute top-3 right-3">
            <UIcon name="i-ri-close-line" class="w-[40px] h-[40px] text-white" @click="isOpen = false" />
          </div>
          <div class="mb-[40px]">
            <NuxtLink to="/">
              <img v-if="headerData.logo" class="max-h-[100px] block" :src="headerData.logo" alt="logo">
            </NuxtLink>
          </div>
          <nav>
            <ul class="flex flex-col">
              <li v-for="item in headerData.nav" :key="item.link" class="py-[10px]">
                <NuxtLink
                  class="block"
                  :to="item.link"
                >
                  {{ item.text }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </USlideover>
    </div>
  </header>
</template>

<script setup lang="ts">
import headerData from '@/data/header.json';

const cartStore = useCartStore();

const isOpen = ref(false)
const route = useRoute();
const router = useRouter();

const changePath = (path: string) => {
  const linkData = path.split('#');
  const div = document.querySelector(`#${linkData[1]}`) as HTMLDivElement;
  if (!div && !path.startsWith('#')) {
    return router.push(path)
  } else {
    const divOffset = div.offsetTop;
    const offset = (document.querySelector('header[class*="sticky"]') as HTMLDivElement).offsetHeight || 0;
    window.scrollTo({ top: divOffset - offset, behavior: 'smooth' });
  }
}

watch(() => route.fullPath, () => {
  isOpen.value = false
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      document.querySelector('header')?.classList.add('header-active')
    } else {
      document.querySelector('header')?.classList.remove('header-active')
    }
  })
});

const countListCart = computed(() => cartStore.cartQuantity)

</script>

<style lang="scss" scoped>
header.header-active {
  & > div {
    transition: all 0.3s ease;
    opacity: 1;
  }
}
nav {
  ul {
    li {
      a {
        font-size: 25px;
        line-height: 30px;
        font-weight: 600;
        transition: all 0.3s ease;
        color: #fff;
        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.nav-mobile {
  z-index: 99999;
  & > div {
    &:last-child {
      background: #000;
      max-width: 90%;
    }
  }
}
</style>
