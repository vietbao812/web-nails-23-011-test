<template>
  <nav class="blog-pagination mt-[20px]">
    <ul class="pagination flex items-center justify-center gap-[12px]">
      <li v-if="hasPreviousPage" class="page-item">
        <NuxtLink class="page-link btn" :to="previousButtonLink(pageNumber)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20.657" height="11.314" viewBox="0 0 20.657 11.314" style="transform: scale(-1, 1)">
            <g fill="#fff" data-name="Group 12">
              <path d="M0 4.657h18v2H0z" data-name="Rectangle 2400" />
              <path d="M13.586 9.9l5.6568542-5.6568542 1.4142136 1.4142135-5.6568542 5.6568543z" data-name="Rectangle 2401" />
              <path d="M15 0l5.6568542 5.6568542-1.4142135 1.4142136-5.6568543-5.6568542z" data-name="Rectangle 2402" />
            </g>
          </svg>
        </NuxtLink>
      </li>
      <li v-for="index in (numberOfPages)" :key="index" class="page-item">
        <NuxtLink class="page-link btn" :class="{ active: index == pageNumber }" :to="`/${urlPrefix}/page/${index}`">
          {{ index }}
        </NuxtLink>
      </li>
      <li v-if="hasNextPage" class="page-item">
        <NuxtLink class="page-link btn" :to="`/${urlPrefix}/page/${pageNumber + 1}`">
          <svg xmlns="http://www.w3.org/2000/svg" width="20.657" height="11.314" viewBox="0 0 20.657 11.314">
            <g fill="#fff" data-name="Group 12">
              <path d="M0 4.657h18v2H0z" data-name="Rectangle 2400" />
              <path d="M13.586 9.9l5.6568542-5.6568542 1.4142136 1.4142135-5.6568542 5.6568543z" data-name="Rectangle 2401" />
              <path d="M15 0l5.6568542 5.6568542-1.4142135 1.4142136-5.6568543-5.6568542z" data-name="Rectangle 2402" />
            </g>
          </svg>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>

interface Props {
  pageNumber: number,
  numberOfPages: number,
  urlPrefix: string
}

const props = defineProps<Props>()

const { pageNumber, numberOfPages, urlPrefix } = props;

const hasNextPage = (pageNumber + 1 <= numberOfPages);
const hasPreviousPage = (pageNumber - 1 >= 1);
const previousButtonLink = (index: number) => {
  let previousURL = '';
  if (index === 2) {
    previousURL = `/${urlPrefix}/`
  } else {
    previousURL = `/${urlPrefix}/page/${(index - 1)}`;
  }
  return previousURL;
}

</script>

<style lang="scss" scoped>
.blog-pagination {
  .pagination {
    .page-item {
      a {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #999;
        border-radius: 4px;
        transition: all 0.3s ease-in-out;
        &:hover {
          background-color: var(--color-primary);
          color: #fff;
        }
        &.active {
          background-color: var(--color-primary);
          color: #fff;
        }
      }
    }
  }
}
</style>
