<template lang="pug">
#Login
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
import { reactive, ref, toRefs } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import debounce from "lodash/debounce";
import { Login } from "@/plugins/api/auth";

export default defineComponent({
  name: "Login",
  setup() {
    // ======= data ========
    const router = useRouter();
    const formRef = ref();
    const { t, locale } = useI18n();
    const store = useStore();
    const device = computed(() => store.getters["System/device"]);
    // data
    const _data = reactive({
      // 登入參數
      loginParams: {
        account: "",
        password: ""
      },
      // 驗證規則
      rules: {
        account: {
          required: true,
          message: "Please input name"
        },
        password: [
          { required: true, whitespace: true, message: () => t("password") },
          { max: 10, message: "To long" }
        ]
      }
    });
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
      const pass = await CheckForm();
      if (pass) {
        // await ApiLogin();
        // 設定權限
        SetRole();
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
      const { data, status } = await Login(_data.loginParams);
      // be set token
      console.log(data, status);
    };
    const SetRole = () => {
      const roleInfo = Object.freeze({
        role: "admin",
        rule: {
          pages: ["editor", "ttt", "nn", "config", "memberlist", "memberid"], // 要小寫
          conponents: []
        }
      });
      localStorage.setHash("roleInfo", roleInfo);
    };
    // ======= return ========
    return {
      ...toRefs(_data),
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
#Login {
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
