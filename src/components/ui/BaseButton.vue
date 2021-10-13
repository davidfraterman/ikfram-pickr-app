<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode"><slot></slot></router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: null,
    },
    link: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #24b4d3;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  display: inline-block;
}

.secondary {
  border: 2px solid #24b4d3;
  background-color: transparent;
  color: #24b4d3;
}

button:hover {
  background-color: #28bfe0;
}

.secondary:hover {
  background-color: rgba(66, 158, 238, 0.171);
  transition: 0.2s all;
}
</style>