<template>
  <div class="max-w-4xl mx-auto px-4">
    <div class="flex">
      <img
        v-if="!error"
        :src="server.icon"
        :alt="server.name"
        class="rounded-full w-32 h-32 mr-8"
      />
      <div class="w-full">
        <div v-if="error" class="text-2xl text-red-800">
          Unknown server.
        </div>

        <div class="mb-4" v-if="!error">
          <div class="text-2xl font-bold block mb-1">Currently Managing</div>
          <div class="text-4xl font-light text-gray-900">{{ server.name }}</div>
        </div>

        <div class="mb-4">
          <label for="server-id" class="text-2xl font-bold block mb-1">
            Server Id
          </label>
          <input
            id="server-id"
            type="text"
            v-model="server.id"
            class="border rounded p-2 w-full max-w-sm bg-gray-100"
            @input="saveServerId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Libraries
import axios from 'axios'

export default {
  name: 'Server',

  data() {
    return {
      server: {},
      error: false
    }
  },

  async mounted() {
    await this.getServer()
  },

  methods: {
    async saveServerId() {
      await axios.put('/api/discord/server', { id: this.server.id })
      await this.getServer()
    },

    async getServer() {
      this.error = false
      try {
        this.server = (await axios.get('/api/discord/server')).data
      } catch (e) {
        console.error(e)
        delete this.server.name
        delete this.server.icon
        this.error = true
      }
    }
  }
}
</script>
