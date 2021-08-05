<template lang="pug">
#EditBox
  .content-area
    TextEdit(v-model:value="contentText")
    p {{draggable}}
    //- .demo {{contentText}}
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TextEdit from "@/components/modules/Editor/AxEditor/ArticleEditor/EditBox/TextEdit.vue";
export default defineComponent({
  name: "EditBox",
  components: {
    TextEdit
  },
  setup() {
    const contentText = ref("");
    return {
      contentText
    };
  }
});
</script>

<style lang="scss" scoped>
#EditBox {
  min-height: 20px;
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-template-areas: "drag content";
  .drag-area {
    grid-area: drag;
    background: #eee;
  }
  .content-area {
    grid-area: content;
    background: #fff;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  .demo {
    font-size: 14px;
    letter-spacing: 2px;
    @include text-break;
  }
}
</style>
