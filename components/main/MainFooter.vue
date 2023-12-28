<template>
  <footer :id="footerData.id" class="bg-secondary relative overflow-x-hidden py-[75px]">
    <div class="container">
      <div class="grid lg:grid-cols-2 gap-[50px] items-center">
        <div>
          <div class="text-main text-[40px] sm:text-[50px] font-black leading-none mb-3">
            {{ footerData.title }}
          </div>
          <div class="grid gap-[25px] mb-[60px]">
            <div v-for="(info, index) in footerData.contact.info" :key="index" class="sm:gap-[35px] gap-[15px] grid grid-cols-[45px_1fr] items-start info_item">
              <img :src="info.icon" alt="icon">
              <div>
                <span v-if="typeof info.label === 'string'">
                  {{ info.label }}
                </span>
                <p v-for="label in info.label" v-else :key="label">
                  {{ label }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex gap-[12px] items-center flex-wrap">
            <NuxtLink v-for="(social, index) in footerData.social" :key="index" :to="social.link" target="_blank" class="w-[50px] h-[50px] rounded-full overflow-hidden">
              <img :src="social.icon" alt="icon">
            </NuxtLink>
          </div>
        </div>
        <div>
          <UForm :validate="validate" :state="state" class="space-y-4 bg-white px-[20px] sm:px-[85px] pt-[30px] sm:pt-[60px] sm:pb-[90px] pb-[40px] rounded-[30px] sm:rounded-[50px] contact_form" @submit="onSubmit">
            <div class="text-[50px] font-black leading-none mb-5">
              {{ footerData.form.title }}
            </div>
            <UFormGroup name="name">
              <UInput v-model="state.name" placeholder="Enter your Name ..." />
            </UFormGroup>

            <UFormGroup name="email">
              <UInput v-model="state.email" type="email" placeholder="Enter a valid email address ..." />
            </UFormGroup>

            <UFormGroup name="message">
              <UInput v-model="state.message" placeholder="Enter your message ..." />
            </UFormGroup>

            <UButton type="submit">
              Submit
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import footerData from '@/data/footer.json';

const state = reactive({
  name: undefined,
  email: undefined,
  message: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) {
    errors.push({ path: 'name', message: 'Required' })
  }
  if (!state.email) {
    errors.push({ path: 'email', message: 'Required' })
  }
  if (!state.message) {
    errors.push({ path: 'message', message: 'Required' })
  }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  await console.log(event.data)
}
</script>

<style lang="scss">
footer {
  .contact_form {
    input {
      background-color: #D9D9D9;
      border-radius: 25px;
      font-style: italic;
      font-weight: 300;
      font-size: 18px;
      padding: 20px;
    }
    button[type="submit"] {
      background-color: var(--color-primary);
      color: #fff;
      font-size: 30px;
      padding: 20px;
      border-radius: 25px;
      transition: all 0.3s ease;
      display: block;
      width: 100%;
      text-transform: uppercase;
      font-weight: 600;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  .info_item {
    font-size: 30px;
    color: #fff;
    line-height: 1;
    font-weight: 400;
    &:nth-child(1) {
      font-size: 35px;
      line-height: 40px;
      font-weight: 700;
    }
    &:nth-child(3) {
      color: var(--color-primary);
      font-size: 50px;
      font-weight: 700;
    }
  }
}
@media (max-width: 640px) {
  footer {
    .info_item {
      font-size: 25px;
      line-height: 30px;
      &:nth-child(1) {
        font-size: 30px;
        line-height: 35px;
      }
      &:nth-child(3) {
        font-size: 40px;
      }
    }
  }
}
</style>
