<template>
  <header class="bg-white h-16 min-w-full flex items-center p-4 shadow-lg">
    <div class="flex flex-1 justify-start items-center">
      <NuxtLink to="/">{{ companyName }}</NuxtLink>
    </div>
    <div>
      <NuxtLink
        v-for="navigationLink in navigationLinks"
        :to="navigationLink.path"
        :key="navigationLink.path"
        >{{ navigationLink.name }}</NuxtLink
      >
    </div>
    <div class="flex flex-1 justify-end items-center">
      <div v-if="!profile">
        <NuxtLink to="/auth/sign-in">Sign In</NuxtLink>
      </div>
      <div v-if="profile">
        <p>{{ profile.emailAddress }}</p>
        <NuxtLink to="/job-posts/create">Create Job Post</NuxtLink>

        <button @click="handleToggleProfileMenu">Profile</button>
        <Teleport to="body">
          <div
            v-if="profileMenuActive"
            class="bg-red-300 top-16 absolute right-0 w-auto h-auto p-8"
          >
            <p>Profile Menu</p>
            <NuxtLink
              v-for="profileMenuLink in profileMenuLinks"
              :to="profileMenuLink.path"
              :key="profileMenuLink.path"
              >{{ profileMenuLink.name }}</NuxtLink
            >
            <button @click="handleSignOut">Sign Out</button>
          </div>
        </Teleport>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import profileMenuLinks from '~/lib/links/profileMenuLinks';
import navigationLinks from '~/lib/links/navigationLinks';

const profileMenuActive = ref(false);

function handleToggleProfileMenu() {
  profileMenuActive.value = !profileMenuActive.value;
}

async function handleSignOut() {
  const { pending, error } = await useFetch(`/api/auth/sign-out`);
  if (pending.value) {
    console.log('loading');
  } else if (error.value) {
    console.log(error.value);
  } else {
    window.location.reload();
  }
}

const {
  data: profile,
  pending,
  error,
  refresh,
} = await useFetch<{ id: string; emailAddress: string }>('/api/profile');
</script>
