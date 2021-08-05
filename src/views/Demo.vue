<template lang="pug">
#Demo
  .login-area
    aForm(
      ref="formRef"
      :model="loginParams"
      :rules="rules"
      :colon="false"
      :labelCol="{span: 8}"
      hideRequiredMark
    )
      //- account
      aFormItem(:label="t('account')" name="account")
        aInput(v-model:value.trim="loginParams.account")
      //- password
      aFormItem(:label="t('password')" name="password")
        aInput(
          v-model:value.trim="loginParams.password"
          type="password"
        )
      aFormItem(:wrapper-col="{offset: 8}")
        aButton(type="primary" @click="ClickLogin") {{t("login")}}
  .lang  
    aButton(@click="ChangeLang('zh-TW')") 中文
    aButton(@click="ChangeLang('en-US')") English
    p {{device}}
</template>

<script lang="ts">
import { defineComponent, UnwrapRef } from "vue";
import { reactive, ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import debounce from "lodash/debounce";
import { Login } from "@/plugins/api/auth";
import { LoginParams } from "@/plugins/api/interface/auth";
import { Dialog } from "@/components/modules/Dialog";

// interface LoginParams {
//   account: string;
//   password: string;
// }

export default defineComponent({
  name: "Demo",
  setup() {
    // ======= data ========
    const router = useRouter();
    const formRef = ref();
    const { t, locale } = useI18n();
    const store = useStore();
    console.log(t);
    // 登入參數
    const loginParams: UnwrapRef<LoginParams> = reactive({
      account: "",
      password: ""
    });
    // 驗證規則
    const rules = {
      account: {
        required: true,
        message: "Please input name"
      },
      password: [
        { required: true, whitespace: true, message: "Please input name" },
        { max: 10, message: "To long" }
      ]
    };
    const device = computed(() => store.getters["System/device"]);
    // ======= function ========
    // 驗證表格
    const CheckForm = async () => {
      return await formRef.value
        .validate()
        .then(() => true)
        .catch(() => false);
    };
    // 按下登入
    const ClickLogin = debounce(async () => {
      DialogTest();
      const pass = await CheckForm();
      if (pass) {
        await ApiLogin();
        router.push({
          path: "/dashboard"
        });
      }
    }, 200);
    // 切換語言
    const ChangeLang = (lang: string) => {
      locale.value = lang;
      localStorage.setHash("local", { lang });
    };
    // 會員登入
    const ApiLogin = async () => {
      // const data = await Login(loginParams);
      const { data, status } = await Login(loginParams);
      console.log(data, status);
    };
    const DialogTest = async () => {
      const ans = await Dialog({});
      console.log(ans);
    };
    // DialogTest();
    // ======= return ========
    return {
      loginParams,
      rules,
      device,
      formRef,
      t,
      ClickLogin,
      ChangeLang
    };
  }
});
</script>

<style lang="scss" scoped>
#Demo {
  @include size;
  display: grid;
  grid-template-columns: 1fr 300px 1fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas:
    ". . ."
    ". login ."
    ". . .";
  .login-area {
    grid-area: login;
  }
}
</style>
