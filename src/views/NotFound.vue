<template lang="pug">
#NotFound
  aResult(status="404" title="404" sub-title="找不到頁面!")
    .extra
      aButton(type="primary" @click="GoBack") 返回上一頁
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const GoBack = () => {
      router.go(-1);
    };
    return { GoBack };
  }
});
</script>

<style lang="scss" scoped>
.extra {
  display: flex;
  justify-content: center;
  align-self: center;
}
</style>
