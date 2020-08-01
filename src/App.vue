<template>
  <div id="app">
    <Header />

    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',

  components: { Header }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
