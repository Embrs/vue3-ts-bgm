import Default from "@/components/modules/Dialog/Default.vue";
import cloneDeep from "lodash/cloneDeep";
import { createVNode, render } from "vue";

interface AnyObject {
  [key: string]: any;
}
const dialogComponent: AnyObject = {
  default: Default
};
const defConfig = {
  okText: "確定",
  cancelText: "取消",
  showOk: true,
  showCancel: true,
  maskClose: true,
  texts: []
};
// -----------------

const RenderComponent = (type: string, setConfig: AnyObject, resolve: any) => {
  // 複製參數
  const config: AnyObject = cloneDeep(defConfig);
  for (const key in config) {
    if (setConfig[key] !== undefined) {
      config[key] = setConfig[key];
    }
  }
  Object.freeze(config);
  // 建立節點
  const container = document.createElement("div");
  document.body.appendChild(container);

  // 銷毀
  const Destroy = () => {
    render(null, container);
    document.body.removeChild(container);
  };
  // 建立
  const toastVNode = createVNode(
    dialogComponent[type],
    {
      config,
      onOk: () => {
        resolve("ok");
        Destroy();
      },
      onCancel: () => {
        resolve("cancel");
        Destroy();
      },
      onClose: () => {
        resolve("close");
        Destroy();
      }
    },
    null
  );
  // 渲染
  render(toastVNode, container);
};
// -----------------
export const Dialog = (setConfig: AnyObject) =>
  new Promise((resolve) => RenderComponent("default", setConfig, resolve));
