import { createI18n } from "vue-i18n";

const CreateMsg = () => {
  const langFiles = require.context("./locales", false);
  const langMsg: any = {};
  langFiles.keys().forEach((key) => {
    const locale = key.replace("./", "").replace(".js", "");
    langMsg[locale] = langFiles(key).default;
  });
  return langMsg;
};

const i18n = createI18n({
  legacy: false,
  locale: "zh-TW",
  messages: CreateMsg()
});

export default i18n;
