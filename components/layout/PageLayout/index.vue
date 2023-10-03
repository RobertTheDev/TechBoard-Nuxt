<template>
  <div class="min-h-screen min-w-full flex flex-col bg-slate-100">
    <Header />
    <div class="flex-1 flex flex-col">
      <slot />
    </div>
    <Footer />
  </div>
</template>
