<template>
  <div class="max-w-4xl mx-auto px-4 mb-32">
    <div class="mb-4">
      <label class="text-2xl font-bold block mb-1">Welcome Channel</label>
      <DiscordSelector
        :options="channelOptions"
        v-model="channel"
        class="w-full max-w-sm"
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

    <div class="mb-4">
      <label class="text-2xl font-bold block mb-1">
        Join Logs
      </label>
      <div class="">
        <div
          v-if="!logs.length"
          class="border rounded text-center text-gray-600"
        >
          Logs are empty...
        </div>

        <table v-else class="table-auto w-full">
          <thead>
            <tr class="text-gray-700">
              <th class="px-2 py-2 border w-1/6">Id</th>
              <th class="px-2 py-2 border w-1/3">Username</th>
              <th class="px-2 py-2 border w-1/6">Nickname</th>
              <th class="px-2 py-2 border w-1/3">Joined At</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(log, index) of logs"
              :key="index"
              class="text-sm"
              :class="{
                'bg-red-100': log.leftServer,
                'bg-gray-100': !log.leftServer && index % 2 === 1
              }"
            >
              <th class="border px-4 py-2 font-medium">{{ log.id }}</th>
              <th class="border px-4 py-2" v-if="log.leftServer" colspan="2">
                User Left Server
              </th>
              <th class="border px-4 py-2 font-bold" v-if="!log.leftServer">
                {{ log.username }}#{{ log.discriminator }}
              </th>
              <th class="border px-4 py-2 font-medium" v-if="!log.leftServer">
                {{ log.nickname || '' }}
              </th>
              <th class="border px-4 py-2 font-medium">
                {{ formatDate(log.joinDate) }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-sm text-gray-600">* Settings are auto-saved.</div>
  </div>
</template>

<script>
// Components
import DiscordSelector from '@/components/DiscordSelector'

// Libraries
import axios from 'axios'
import { format } from 'date-fns'

export default {
  name: 'Welcome',

  components: { DiscordSelector },

  data() {
    return {
      channel: null,
      messages: '',

      channelOptions: [],

      logs: []
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
    this.logs = (await axios.get('/api/welcome/logs')).data
  },

  methods: {
    async saveChannelId() {
      await axios.put('/api/welcome/channel', { id: this.channel.id })
    },

    async saveMessages() {
      await axios.put('/api/welcome/messages', this.messages.split('\n'))
    },

    formatDate(date) {
      return format(new Date(date), 'MMMM do yyyy h:mm a')
    }
  }
}
</script>
