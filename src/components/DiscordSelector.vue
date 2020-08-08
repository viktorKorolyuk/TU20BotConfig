<template>
  <button
    class="border bg-gray-100 p-2 text-left relative"
    @click="open = true"
  >
    <div v-if="value" class="flex items-center text-gray-700">
      <Hashtag class="w-4 h-4 mr-2 text-gray-500" />
      {{ value.name }}
    </div>
    <div v-else>Select an option...</div>
    <div
      v-if="open"
      class="absolute bg-white p-2 h-64 overflow-y-scroll"
      v-on-clickaway="close"
    >
      <button
        v-for="(option, index) of options"
        :key="index"
        class="flex items-center text-gray-700 w-full p-2 hover:bg-gray-100"
        @click.stop="select(option)"
      >
        <Hashtag class="w-4 h-4 mr-2 text-gray-500" />
        {{ option && option.name }}
      </button>
    </div>
  </button>
</template>

<script>
// Icons
import Hashtag from 'heroicons/outline/hashtag.svg'

// Libraries
import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'DiscordSelector',

  components: { Hashtag },
  directives: { onClickaway },

  props: ['options', 'value'],

  data() {
    return {
      open: false
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
