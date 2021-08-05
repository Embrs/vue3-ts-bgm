<template lang="pug">
#MenuBar
  aButton(type="primary" style="margin-bottom: 16px")
    //- IconLove(spin)
    .icon-down-dir
    //- MenuFoldOutlined
  i(class="icon-delete-1")
  i(class="icon-delete-1")
  aDatePicker
  //- first menu
  .first-menu
    .first(v-for="firstItem in menuList" :key="firstItem.name")
      .first-item(
        @click="ClickFirst(firstItem)"
        :class="{'is-select': currentPage === firstItem.name}"
      ) {{firstItem.name}}
      //- second menu
      .second-menu(:style="StyleOpen(firstItem, selectFirst)")
        .second(v-for="secondItem in firstItem.menus" :key="secondItem.name")
          .second-item(
            @click="ClickSecond(secondItem, firstItem.name)"
            :class="{'is-select': currentPage === secondItem.name}"
          ) {{secondItem.name}}
          //- third menu
          .third-menu(:style="StyleOpen(secondItem, selectSecond)")
            .third(v-for="thirdItem in secondItem.menus" :key="thirdItem.name")
              .third-item(
                @click="ClickThird(thirdItem, firstItem.name, secondItem.name)"
                :class="{'is-select': currentPage === thirdItem.name}"
              ) {{thirdItem.name}}
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import debounce from "lodash/debounce";
import { useStore } from "vuex";
import { MenuFoldOutlined, MenuUnfoldOutlined, SyncOutlined } from "@ant-design/icons-vue";
import IconLove from "@/components/Icons/Iconlove.vue";

type MenuItem = {
  name: string;
  path: string;
  menus: Array<MenuItem>;
};
export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SyncOutlined,
    IconLove
  },
  setup() {
    const store = useStore();
    const router = useRouter(); // 路由
    const route = useRoute(); // 路線
    let currentPath = computed(() => route.path).value;
    store.dispatch("Router/CreateMenuList"); // 建立menu列表
    const menuList = computed(() => store.getters["Router/menuList"]);

    // _data
    const _data = reactive({
      selectFirst: "",
      selectSecond: "",
      selectThird: "",
      currentPage: ""
    });

    // 初始化目前頁面
    const InitCurrentPath = () => {
      const _path = currentPath.replace("/dashboard/", "");
      const points = _path.split("/:")[0].split("/");
      if (points.length === 0) return;
      _data.selectFirst = points[0] || "";
      _data.selectSecond = points[1] || "";
      _data.selectThird = points[2] || "";
      _data.currentPage = points[points.length - 1];
    };
    InitCurrentPath();

    // 樣式 - 最高值
    const StyleOpen = (menu: MenuItem, select: string) => {
      if (select !== menu.name) return {};
      const CalculateCount = (list: Array<MenuItem>) => {
        let sum = list.length;
        let max = 0;
        for (const item of list) {
          const c = CalculateCount(item.menus);
          max = c > max ? c : max;
        }
        sum += max;
        return sum;
      };
      const count = CalculateCount(menu.menus);
      return {
        "max-height": `${count * 40}px !important`
      };
    };
    // 跳轉 path
    const ToPath = (path: string, name: string) => {
      if (path.length > 0 && name.length > 0) {
        _data.currentPage = name;
        router.push({ path });
      }
    };
    // 選擇 First
    const ClickFirst = debounce((item: MenuItem) => {
      const { name, path } = item;
      _data.selectFirst = _data.selectFirst === name ? "" : name; // 開關
      _data.selectSecond = "";
      _data.selectThird = "";
      ToPath(path, name);
    }, 200);

    // 選則 Second
    const ClickSecond = debounce((item: MenuItem, _name: string) => {
      const { name, path } = item;
      _data.selectFirst = _name;
      _data.selectSecond = _data.selectSecond === name ? "" : name; // 開關
      _data.selectThird = "";
      ToPath(path, name);
    }, 200);

    // 選則 Third
    const ClickThird = debounce((item: MenuItem, _name: string, optoin: string) => {
      const { name, path } = item;
      _data.selectFirst = _name;
      _data.selectSecond = optoin;
      _data.selectThird = _data.selectSecond === name ? "" : name; // 開關
      ToPath(path, name);
    }, 200);

    return {
      ...toRefs(_data),
      menuList,
      StyleOpen,
      ClickFirst,
      ClickSecond,
      ClickThird
    };
  }
});
</script>

<style lang="scss" scoped>
#MenuBar {
  background-color: #001628;
  height: 100%;
  color: #fff;
  user-select: none;
  .first-menu {
    width: 100%;
    .first {
      width: 100%;
      padding-bottom: 5px;
      .second-menu {
        transition: max-height 0.4s ease;
        max-height: 0;
        overflow: hidden;
        .third-menu {
          transition: max-height 0.4s ease;
          max-height: 0;
          overflow: hidden;
        }
      }
    }
  }
  //- 元件
  .first-item {
    width: 100%;
    height: 40px;
    background: rgb(35, 47, 75);
    color: #fff;
    padding: 5px 10px;
  }
  .second-item {
    width: 100%;
    min-height: 30px;
    background: rgb(44, 81, 89);
    color: #fff;
    padding: 5px 10px;
    margin-top: 3px;
  }
  .third-item {
    width: 100%;
    min-height: 30px;
    background: rgb(48, 118, 54);
    color: #fff;
    padding: 5px 10px;
    margin-top: 3px;
  }
  .is-select {
    background: rgb(136, 136, 136);
  }
}
</style>
