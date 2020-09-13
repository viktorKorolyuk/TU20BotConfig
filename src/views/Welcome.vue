<template>
  <div class="max-w-4xl mx-auto px-4 mb-32">
    <div class="mb-4">
      <label class="text-2xl font-bold block mb-1">Welcome Channel</label>
      <DiscordSelector
        :options="channelOptions"
        v-model="channel"
        class="w-full max-w-sm"
        icon="text"
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
// Components
import DiscordSelector from '@/components/DiscordSelector'

// Libraries
import axios from 'axios'

export default {
  name: 'Welcome',

  components: { DiscordSelector },

  data() {
    return {
      channel: null,
      messages: '',

      channelOptions: []
    }
  },

  async mounted() {
    this.channelOptions = (
      await axios.get('/api/discord/channels', {
        params: {
          type: 'text'
        }
      })
    ).data

    const id = (await axios.get('/api/welcome/channel')).data

    this.channel = this.channelOptions.find(x => x.id === id)
    this.messages = (await axios.get('/api/welcome/messages')).data.join('\n')
  },

  methods: {
    async saveChannelId() {
      await axios.put('/api/welcome/channel', { id: this.channel.id })
    },

    async saveMessages() {
      await axios.put('/api/welcome/messages', this.messages.split('\n'))
    }
  }
}
</script>
