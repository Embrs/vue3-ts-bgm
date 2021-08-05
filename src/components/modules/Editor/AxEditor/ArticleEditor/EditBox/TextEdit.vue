<template lang="pug">
#TextEdit(
  contenteditable="true"
  :value="value"
  :spellcheck="false"
  @input="ChangeText"
)
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextEdit",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const ChangeText = (event: any) => {
      console.dir(event);
      const innerText = event.target.innerText;
      emit("update:value", innerText);
    };
    return {
      props,
      ChangeText
    };
  }
});
</script>

<style lang="scss" scoped>
#TextEdit {
  letter-spacing: 2px;
  font-size: 14px;
}
// 去除框
[contenteditable] {
  outline: 0px solid transparent;
  -webkit-user-modify: read-write-plaintext-only;
}
</style>
