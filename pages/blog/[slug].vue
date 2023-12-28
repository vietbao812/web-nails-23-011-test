<template>
  <div>
    <section class="blog-details">
      <div class="container">
        <div class="row">
          <div class="">
            <article class="blog-single py-[50px]">
              <div class="inner-blog-details">
                <h1 class="heading-2">
                  {{ pageData.title }}
                </h1>
                <div class="">
                  <ul class="">
                    <li class="py-[20px]">
                      <p><span> Written by: &nbsp;</span>{{ pageData.author }}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-[30px]">
                <!-- eslint-disable -->
                <img v-if="pageData.featuredImg" :src="pageData.featuredImg.image" class="w-full object-cover rounded-[20px]"
                  :alt="pageData.featuredImg.image_alt" />
                <!-- {{ pageData.content }} -->
              </div>
              <!-- eslint-enable -->
              <div style="max-width: 900px; margin: 0 auto">
                <ContentDoc v-slot="{doc}">
                  <!-- eslint-disable -->
                  <div v-html="doc.content" />
                  <!-- {{ pageData.content }} -->
                </ContentDoc>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section class="blog-related">
      <div class="container">
        <div class="blog-section">
          <h3 class="font-bold mb-[20px]">Recent Blog</h3>
        </div>
        <div class="grid grid-cols-3 gap-[20px] pb-[50px]">
          <div v-for="(post, index) in recommendedBlogPosts" :key="index">
            <article class="blog-post">
              <div class="mb-[16px]">
                <NuxtLink :to="post._path">
                  <img :src="post.thumbImg.image" :alt="post.thumbImg.image_alt" />
                </NuxtLink>
              </div>
              <div class="blog-post-content">
                <div class="blog-post-title">
                  <h2 class="heading-4">
                    <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
                  </h2>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import NewzenConnector from 'newzen-connector';
import 'newzen-connector/dist/style.css';
// import { DateTime } from 'luxon';
const route = useRoute();

const { page } = useContent();

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

const pageData = page.value;

const numRecentPosts = 3;
const recommendedBlogPosts = await queryContent('blog')
  .where({
    _path: { $ne: '/blog' }
  })
  .only(['title', 'thumbImg', 'tags', '_path'])
  .sort({ createdAt: -1 })
  .limit(numRecentPosts)
  .find();

// const blogDate = DateTime.fromISO(pageData.date, 'string').toLocaleString(DateTime.DATE_FULL);

const head = generateHead(pageData, route);
useHead(head);

const formattedPage = ref(pageData.content_blocks ? NewzenConnector.formatContentBlock(pageData) : {});

const newzenCallback = (_formattedPage: any) => {
  formattedPage.value = _formattedPage;
}

const connector = new NewzenConnector({ initialData: formattedPage.value, callback: newzenCallback });

onMounted(() => {
  connector.actionHandler()
})

</script>
