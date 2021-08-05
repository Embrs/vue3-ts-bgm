<template lang="pug">
//- 文章編輯區域
#ArticleEditor
  EditBox
  EditBox
  EditBox
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditBox from "@/components/modules/Editor/AxEditor/ArticleEditor/EditBox.vue";
export default defineComponent({
  components: {
    EditBox
  },
  name: "ArticleEditor",
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
#ArticleEditor {
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
