<template>
  <div class="loading-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  display: block;
  border: 3px solid rgb(12, 148, 189);
  border-radius: 100%;
  border-top: 4px solid rgb(58, 58, 58);
  border-right: 1px solid rgb(58, 58, 58);
  border-bottom: 3px solid rgb(58, 58, 58);
  width: 50px;
  height: 50px;
  animation: spin 0.5s ease infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>