<template>
  <div
    v-if="visible"
    class="bottom-0 right-0 px-8 py-4 m-8 rounded-lg w-auto pointer-events-none fixed transition-opacity duration-2000 bg-green-100 text-green-700"
    v-bind:class="{ 'opacity-0': fade }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Flash',

  data() {
    return {
      visible: false,
      fade: false
    }
  },

  computed: {
    confirm() {
      return this.type === 'confirm'
    },

    decline() {
      return this.type === 'decline'
    },

    edit() {
      return this.type === 'edit'
    }
  },

  methods: {
    show() {
      this.visible = true

      this.fade = false

      setTimeout(() => {
        this.fade = true
      }, 4000)
    }
  }
}
</script>
