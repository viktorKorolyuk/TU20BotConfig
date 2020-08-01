<template>
  <div class="max-w-4xl mx-auto px-4">
    <div class="mb-4">
      <label for="channel-id" class="text-2xl font-bold block mb-1"
        >Message Channel Id
      </label>
      <input
        type="number"
        id="channel-id"
        v-model="channelId"
        class="border rounded p-2 w-full max-w-sm bg-gray-100"
        @input="saveChannelId"
      />
    </div>

    <div class="mb-4">
      <label for="allowed-messages" class="text-2xl font-bold block mb-1">
        Allowed Messages
      </label>
      <textarea
        id="allowed-messages"
        v-model="messages"
        rows="10"
        class="border rounded p-2 w-full max-w-sm bg-gray-100"
        @input="saveMessages"
      >
      </textarea>
    </div>

    <div class="text-sm text-gray-600">* Settings are auto-saved.</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Welcome',

  data() {
    return {
      channelId: '',
      messages: ''
    }
  },

  async mounted() {
    this.channelId = (await axios.get('/api/welcome/channel')).data
    this.messages = (await axios.get('/api/welcome/messages')).data.join('\n')
  },

  methods: {
    async saveChannelId() {
      await axios.put('/api/welcome/channel', this.channelId)
    },

    async saveMessages() {
      await axios.put('/api/welcome/messages', this.messages.split('\n'))
    }
  }
}
</script>
