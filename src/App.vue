<template lang="pug">
#app
  router-view(v-slot="{Component}")
    transition(name="fade" mode="out-in")
      component(:is="Component")
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(() => {
      window.addEventListener("resize", WindowResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", WindowResize);
    });
    const WindowResize = () => {
      store.dispatch("System/HandResetDevice");
    };
    WindowResize();
  }
});
</script>

<style lang="scss">
html,
body {
  height: 100%;
  @extend %init;
  #app {
    @extend body;
  }
}
</style>
