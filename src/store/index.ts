import { createStore } from "vuex";
import System from "./System";
import Router from "./Router";
export default createStore({
  modules: {
    System,
    Router
  }
});
