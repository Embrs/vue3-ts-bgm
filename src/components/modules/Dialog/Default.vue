<template lang="pug">
#Default
  .dialog-mask(@click="ClickMask")
  .content-area
    .content
      .texts
        p(v-for="(text, idx) in config.texts" :key="idx") {{text}}
      .btns
        .btn(@click="ClickCancel")
          p {{config.cancelText}}
        .btn.ok( @click="ClickOk")
          p {{config.okText}}
</template>

<script lang="ts">
import debounce from "lodash/debounce";
import { defineComponent, onBeforeUnmount } from "vue";

export default defineComponent({
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const ClickMask = debounce(() => {
      emit("close");
    }, 200);
    const ClickOk = debounce(() => {
      emit("ok");
    }, 200);
    const ClickCancel = debounce(() => {
      emit("cancel");
    }, 200);
    onBeforeUnmount(() => {
      console.log("Before Unmount!");
      // clearInterval(sit);
    });
    return { props, ClickMask, ClickOk, ClickCancel };
  }
});
</script>

<style lang="scss" scoped>
// 排版
#Default {
  @include pfixed;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
  letter-spacing: 1fr;
  .dialog-mask {
    @include size;
    position: absolute;
    z-index: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
  }
  .content-area {
    grid-column: 2;
    grid-row: 2;
    z-index: 1;
  }
}
// 元件
#Default {
  .content {
    @include animation(0.2s, open);
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 10px;
    grid-template-areas:
      "texts"
      "btns";
    .texts {
      grid-area: "texts";
    }
    .btns {
      grid-area: "btns";
      @include flex;
      gap: 10px;
      .btn {
        @include btn-click;
        min-width: 100px;
        font-size: 14px;
        line-height: 18px;
        padding: 5px 10px;
        border: 1px solid #666;
        border-radius: 4px;
        text-align: center;
        p {
          letter-spacing: 5px;
          padding-left: 5px;
        }
      }
    }
  }
  .ok {
    background: #6bc2ed;
    &:hover {
      background: #7396b1;
    }
    &:active {
      background: #7396b1;
    }
  }
}
</style>
