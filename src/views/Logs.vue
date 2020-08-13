<template>
  <div class="max-w-4xl mx-auto px-4 mb-32">
    <div class="mb-4">
      <div class="flex items-center mb-3">
        <div class="text-2xl font-bold block">
          Join Logs
        </div>
        <a href="/api/logs/excel.xlsx" download class="ml-auto">
          <button
            class="bg-blue-500 text-sm text-white transition-colors duration-150 hover:bg-blue-600 rounded px-4 py-2 flex items-center"
          >
            <CloudDownload class="w-4 h-4 mr-2" />
            Export
          </button>
        </a>
      </div>
      <div>
        <div
          v-if="!logs.length"
          class="border rounded text-center text-gray-600 py-2"
        >
          Logs are empty...
        </div>

        <table v-else class="table-auto w-full">
          <thead>
            <tr class="text-gray-700">
              <th class="px-2 py-2 border w-1/6">Id</th>
              <th class="px-2 py-2 border w-1/3">Username</th>
              <th class="px-2 py-2 border w-1/6">Name</th>
              <th class="px-2 py-2 border w-1/3">Joined At (UTC)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(log, index) of logs"
              :key="index"
              class="text-sm"
              :class="{
                'bg-red-100': log.type === 'leave',
                'bg-gray-100': log.type === 'join' && index % 2 === 1
              }"
            >
              <th class="border px-4 py-2 font-medium text-xs">{{ log.id }}</th>
              <th class="border px-4 py-2 font-bold">
                {{ log.username }}#{{ log.discriminator }}
              </th>
              <th class="border px-4 py-2 font-medium">
                {{ log.nickname || log.username }}
              </th>
              <th class="border px-4 py-2 font-medium">
                {{ formatDate(log.joinDate) }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// Icons
import CloudDownload from 'heroicons/outline/cloud-download.svg'

// Libraries
import axios from 'axios'
import { format } from 'date-fns'

export default {
  name: 'Logs',

  components: { CloudDownload },

  data() {
    return {
      logs: []
    }
  },

  async mounted() {
    this.logs = (await axios.get('/api/logs')).data
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), 'MMMM do yyyy h:mm a')
    }
  }
}
</script>
