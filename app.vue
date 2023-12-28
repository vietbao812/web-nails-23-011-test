<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator />
        <NuxtPage />
        <UNotifications />
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { setCartList } = useCartStore();

if (process.browser) {
  setCartList(JSON.parse(localStorage.getItem('listCart') || '[]'));
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
