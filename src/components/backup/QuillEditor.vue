/**
<template lang="pug">
#Editor
  QuillEditor(
    v-model:content="editContent"
    theme="snow"
    contentType="html"
    toolbar="full"
  )
  //- p {{editContent}}
  .ql-container(v-html="editContent")
</template>

<script lang="ts">
//  import type { RawEditorSettings } from 'tinymce';
import { defineComponent, ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default defineComponent({
  components: {
    QuillEditor
  },
  setup() {
    const editContent = ref("");
    const modules = {
      // name: "blotFormatter",
      // module: BlotFormatter,
      // options: {
      //   /* options */
      // }
    };
    return {
      editContent,
      modules
    };
  }
});
</script>

<style lang="scss" scoped>
// video 自動縮放
::v-deep .ql-video {
  max-width: 90vw !important;
  max-height: 60vw !important;
  margin: auto;
  display: flex;
  width: 600px;
  height: 400px;
}
</style>
*/
