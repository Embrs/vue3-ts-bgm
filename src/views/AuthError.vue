<template lang="pug">
#AuthError
  aResult(status="warning" title="權限不足" sub-title="可能權限逾時或沒有權限訪問此頁面")
    .extra
      aButton(type="primary" @click="GoLogin") 返回登入頁
      aButton(type="primary" @click="GoBack") 返回上一頁
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const GoBack = () => {
      // 上一頁為錯誤頁
      router.go(-2);
    };
    const GoLogin = () => {
      router.push({
        path: "/login"
      });
    };
    return { GoBack, GoLogin };
  }
});
</script>

<style lang="scss" scoped>
.extra {
  display: flex;
  justify-content: center;
  align-self: center;
  gap: 10px;
}
</style>
