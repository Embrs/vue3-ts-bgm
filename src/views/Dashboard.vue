<template lang="pug">
#Dashboard
  .header-area
    p TSNA
    router-link(to="/") Login
  .menu-area
    MenuBar
  .page-area
    router-view
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useI18n } from "vue-i18n";
import MenuBar from "@/components/layout/MenuBar.vue";
export default defineComponent({
  components: { MenuBar },
  setup() {
    const { t } = useI18n();
    const local = reactive(localStorage.getHash("local"));
    return { t, local };
  }
});
</script>

<style lang="scss" scoped>
#Dashboard {
  @include size;
  display: grid;
  grid-template-rows: 40px auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "menu header"
    "menu page";
  .header-area {
    grid-area: header;
    display: flex;
    background: #eee;
  }
  .menu-area {
    grid-area: menu;
    background: #ccc;
  }
  .page-area {
    // max-height: calc(100vh - 40px);
    grid-area: page;
  }
}
</style>
