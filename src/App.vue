<template>
    <a-config-provider :autoInsertSpaceInButton="false" :locale="zhCN" prefixCls='industryAnt'>
        <div id="app">
            <router-view />
        </div>
    </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import { formatThemeConfig } from '@/utils/antd/antdVariables';
import 'moment/locale/zh-cn';
// import { HookMixinBaseComponent } from '@/utils/privateHookUtils';

import Utils from '@/utils';

moment.locale('zh-cn');

export default {
  inject: ['privateConfig'],
  data() {
    return {
      zhCN,
    };
  },

  beforeMount() {
    const { themesVar } = this.privateConfig.themeConfig.brandSetting;
    const themes = {};
    Object.keys(themesVar).forEach((key) => {
      themes[`@${this.change(key)}`] = themesVar[key];
    });
    console.log(formatThemeConfig(themes), 'formatThemeConfig(themes)');
    window.less
      .modifyVars(formatThemeConfig(themes))
      .then(() => {
        console.log('', themes);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  mounted() {
    console.log(this.privateConfig, 'privateConfig');
    if (Utils.isIE()) {
      window.addEventListener('hashchange', () => {
        const currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath);
        }
      }, false);
    }
    window?.microAppProps?.dispatch?.({ type: 'loaded', data: window?.microAppProps?.pageInfo });
  },

  methods: {
    // 驼峰转-
    change(str) {
      const arr = str.split('');
      const newArr = arr.map(ite => (ite.toUpperCase() === ite ? `-${ite.toLowerCase()}` : ite));
      return newArr.join('');
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
@import '~@/assets/icons-font/style.css';

/* stylelint-disable-next-line selector-max-id */
#app {
  font-family: 'PingFang SC Regular', PingFangSC-Regular,
    'Microsoft Yahei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  // background-color: @background-color;
  background-color: #edeef0;
  height: 100%;
}

body {
  background: #edeef0;
}
</style>
