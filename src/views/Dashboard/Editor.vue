<template lang="pug">
#Blog
  AxEditor
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AxEditor from "@/components/modules/Editor/AxEditor.vue";
// import Editor from "@/components/backup/QuillEditor.vue";
export default defineComponent({
  components: {
    AxEditor
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
#Blog {
  @include size;
  padding: 10px;
}
</style>
