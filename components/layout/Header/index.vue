<template>
  <header class="bg-white h-16 min-w-full flex items-center p-4 shadow-lg">
    <div class="flex justify-start items-center">
      <NuxtLink to="/">{{ companyName }}</NuxtLink>
    </div>
    <div class="flex items-center justify-center flex-1 gap-8">
      <NuxtLink
        v-for="navigationLink in navigationLinks"
        :to="navigationLink.path"
        :key="navigationLink.path"
        >{{ navigationLink.name }}</NuxtLink
      >
    </div>
    <div class="flex justify-end items-center">
      <div v-if="!profile">
        <NuxtLink to="/auth/sign-in">Sign In</NuxtLink>
      </div>
      <div class="flex items-center gap-4" v-if="profile">
        <NuxtLink to="/job-posts/create">Create Job Post</NuxtLink>

        <div class="h-10 w-10 rounded-full overflow-hidden">
          <input
            type="image"
            @click="handleToggleProfileMenu"
            class="h-full w-full object-cover"
            :src="
              profile.avatar
                ? profile.avatar
                : 'https://i.stack.imgur.com/l60Hf.png'
            "
            alt="Profile Image"
          />
        </div>

        <ProfileMenu ref="profileMenuTarget" v-if="profileMenuActive" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import navigationLinks from '~/lib/links/navigationLinks';
import IProfile from '~/models/profile/interfaces/Profile';
import { onClickOutside } from '@vueuse/core';

const profileMenuActive = ref(false);

const profileMenuTarget = ref(null);

onClickOutside(profileMenuTarget, () => (profileMenuActive.value = false));

function handleToggleProfileMenu() {
  profileMenuActive.value = !profileMenuActive.value;
}

const {
  data: profile,
  pending,
  error,
  refresh,
} = await useFetch<IProfile>('/api/profile');
</script>
