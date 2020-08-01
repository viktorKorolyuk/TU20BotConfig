<template>
  <div class="mb-4 px-4">
    <!-- Logo -->
    <div class="flex items-center py-6">
      <img
        src="@/assets/tu20logo.png"
        alt="TU20"
        class="rounded-full w-10 h-10 ml-auto"
      />

      <div class="ml-4 text-2xl mr-auto font-bold">
        TU20 Bot Settings
      </div>
    </div>

    <!-- Nav Links -->
    <div class="flex justify-center mx-auto max-w-4xl border-b">
      <router-link
        tag="a"
        to="/server"
        class="flex items-center font-light p-2"
        :class="{ 'border-b-2 border-black font-bold': server }"
      >
        <Globe class="w-4 h-4 mr-2" />
        Server
      </router-link>
      <router-link
        tag="a"
        to="/welcome"
        class="flex items-center font-light p-2"
        :class="{ 'border-b-2 border-black font-bold': welcome }"
      >
        <Hand class="w-4 h-4 mr-2" />
        Welcome
      </router-link>
    </div>
  </div>
</template>

<script>
// Icons
import Hand from 'heroicons/outline/hand.svg'
import Globe from 'heroicons/outline/globe.svg'

export default {
  name: 'Header',

  components: { Hand, Globe },

  computed: {
    server() {
      return this.$route.meta.server
    },

    welcome() {
      return this.$route.meta.welcome
    }
  }
}
</script>
