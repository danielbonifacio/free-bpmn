<template>
  <div class="window">
    <App/>
  </div>
</template>

<script>
import App from './App';

export default {
  name: 'Window',
  components: {
    App,
  },
};
</script>

<style lang="scss">
.window::before {
  pointer-events: none;
  // border: 1px solid rgba(#000, .1);
  border-radius: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
  content: '';
  z-index: 9999;
}

/* scrollbar width */
::-webkit-scrollbar {
  display: none;
}
</style>

