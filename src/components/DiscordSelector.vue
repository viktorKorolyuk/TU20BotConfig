<template>
  <button
    class="border bg-gray-100 p-2 text-left relative rounded"
    @click="open = true"
  >
    <div v-if="value" class="flex items-center text-gray-700">
      <Hashtag class="w-4 h-4 mr-2 text-gray-500" v-if="text" />
      <VolumeUp class="w-4 h-4 mr-2 text-gray-500" v-if="audio" />
      {{ value.name }}
    </div>
    <div class="text-gray-700" v-else>Select an option...</div>
    <div
      v-if="open"
      class="absolute bg-white p-2 h-64 overflow-y-scroll"
      v-on-clickaway="close"
    >
      <button
        v-for="(option, index) of options"
        :key="index"
        class="flex items-center text-gray-700 p-2 hover:bg-gray-100 w-64"
        @click.stop="select(option)"
      >
        <Hashtag class="w-4 h-4 mr-2 text-gray-500" v-if="text" />
        <VolumeUp class="w-4 h-4 mr-2 text-gray-500" v-if="audio" />
        {{ option && option.name }}
      </button>
    </div>
  </button>
</template>

<script>
// Icons
import Hashtag from 'heroicons/outline/hashtag.svg'
import VolumeUp from 'heroicons/outline/volume-up.svg'

// Libraries
import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'DiscordSelector',

  components: { Hashtag, VolumeUp },
  directives: { onClickaway },

  props: ['options', 'value', 'icon'],

  data() {
    return {
      open: false
    }
  },

  computed: {
    text() {
      return this.icon === 'text'
    },

    audio() {
      return this.icon === 'audio'
    }
  },

  methods: {
    select(option) {
      this.open = false
      this.$emit('input', option)
    },

    close() {
      this.open = false
    }
  }
}
</script>
