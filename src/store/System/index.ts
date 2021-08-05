import type { ActionContext } from "vuex";

export type Device = "phone" | "pad" | "web";
export interface State {
  device: Device;
}
export default {
  namespaced: true,
  state: {
    device: "phone"
  },
  actions: {
    HandResetDevice(context: ActionContext<any, any>) {
      let device: Device;
      if (window.innerWidth > 1024) {
        device = "web";
      } else if (window.innerWidth > 768) {
        device = "pad";
      } else {
        device = "phone";
      }
      context.commit("setDevice", device);
    }
  },
  mutations: {
    setDevice(state: State, device: Device) {
      state.device = device;
    }
  },
  getters: {
    device: (state: State) => state.device
    // be fix 做  Device 實作
  }
};
