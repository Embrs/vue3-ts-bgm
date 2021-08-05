<template lang="pug">
#MenuBar
  aButton(type="primary" @click="ToggleCollapsed" style="margin-bottom: 16px")
    MenuUnfoldOutlined(v-if="collapsed") 
    MenuFoldOutlined(v-else) 
  aMenu(
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  )
    aMenuItem(key="1")
      template(#icon)
        //- PieChartOutlined
      span Option 1
    aMenuItem(key="2")
      template(#icon)
        //- DesktopOutlined
      span Option 2
    aMenuItem(key="3")
      template(#icon)
        //- InboxOutlined
      span Option 3
    aSubMenu( key="sub1")
      template(#icon)
        //- MailOutlined
      template( #title) Navigation One
      a-menu-item(key="5") Option 5
      a-menu-item(key="6") Option 6
      a-menu-item(key="7") Option 7
      a-menu-item(key="8") Option 8
    aMenuItem(key="9")
      template(#icon)
        //- PieChartOutlined
      span Option 4
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PieChartOutlined,
//   MailOutlined,
//   DesktopOutlined,
//   InboxOutlined,
//   AppstoreOutlined
// } from "@ant-design/icons-vue";
export default defineComponent({
  // components: {
  //   MenuFoldOutlined,
  //   MenuUnfoldOutlined,
  //   PieChartOutlined,
  //   MailOutlined,
  //   DesktopOutlined,
  //   InboxOutlined,
  //   AppstoreOutlined
  // },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"]
    });
    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );
    const ToggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };
    return {
      ...toRefs(state),
      ToggleCollapsed
    };
  }
});
</script>

<style lang="scss" scoped>
#MenuBar {
  user-select: name;
  background-color: #001628;
  height: 100%;
  color: #fff;
}
::v-deep .ant-menu {
  user-select: none;
}
</style>
