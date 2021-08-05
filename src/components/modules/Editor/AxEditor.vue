<template lang="pug">
//- Ax 富文本
#AxEditor
  .tools-area
    .tool-button(
      v-for="tool in ctrlTools"
      :key="tool.type"
      @click="ClickToolButton(tool)"
    ) {{tool.name}}
  .edit-area
    ArticleEditor
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import debounce from "lodash/debounce";
import ArticleEditor from "@/components/modules/Editor/AxEditor/ArticleEditor.vue";
import type { CtrlTools, Tool } from "@/components/modules/Editor/AxEditor/interface";

export default defineComponent({
  name: "AxEditor",
  components: {
    ArticleEditor
  },
  setup() {
    const ctrlTools: CtrlTools = reactive([
      {
        type: "text",
        name: "文字"
      },
      {
        type: "image",
        name: "圖片"
      },
      {
        type: "video",
        name: "影片"
      }
    ]);
    // 點擊類型按鈕
    const ClickToolButton = debounce((tool: Tool) => {
      console.log(tool);
    }, 200);
    return {
      ctrlTools,
      ClickToolButton
    };
  }
});
</script>

<style lang="scss" scoped>
#AxEditor {
  @include size;
  max-height: 600px;
  display: grid;
  grid-template-rows: minmax(50px, auto) 1fr;
  grid-template-areas:
    "tools"
    "content";
  border: 1px solid #666;
  .tools-area {
    grid-area: tools;
    background: #aaa;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #666;
  }
  .edit-area {
    max-height: 100%;
    overflow-y: auto;
    grid-area: content;
  }
}
.tool-button {
  @include btn-click;
  @include flex;
  box-sizing: border-box;
  border: 1px solid rgb(255, 255, 255);
  background: #fff;
  border-radius: 4px;
  padding: 2px 10px;
  font-size: 14px;
}
</style>
