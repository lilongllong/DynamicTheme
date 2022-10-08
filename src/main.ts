import Vue from 'vue';
import Antd, { message, notification } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import 'ant-design-vue/es/notification/style/index';
import VueCompositionApi from '@vue/composition-api';
import { isMicroApp, normalizeObject } from './utils/microApp';
import VueClipboard from 'vue-clipboard2';

import App from './App.vue';
import './registerAegis';
import './registerServiceWorker';
import router, { createRouter } from './router';
import store from './store';
import generatorAxiosInteceptors from './utils/axiosInterceptors';
import Utils from './utils';
import HookMixinBaseComponent from './ASPUtils/hookMixinBaseComponent';
import 'normalize.css';
import './styles/index.less';

// @ts-ignore
import hljs from 'highlight.js/lib/core.js';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript.js';
// @ts-ignore
import shell from 'highlight.js/lib/languages/shell.js';
// @ts-ignore
import vuePlugin from '@highlightjs/vue-plugin';
import 'highlight.js/styles/a11y-dark.css';
// 自研组件样式
// import '@/private/injectFiles/custom.css';

import cookie from 'vue-cookies';

import privateConfig from './private';
// import { getUserInfo, refreshToken } from '@/api';
// import { tokenRefreshInterval, privatizationHost } from '@/utils/resource';

// import NewTheme from '@/styles/theme/newStyle';
// import { VueConstructor } from 'vue/types/umd';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('shell', shell);


// eslint-disable-next-line @typescript-eslint/no-require-imports
// require('echarts');
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const less = require('less');
let vueInstance: Vue | null;

Vue.use(cookie);
Vue.use(VueClipboard);
Vue.use(vuePlugin);

const normalID = 'e1a3eae44d1ba905ce442d9abd570590';

generatorAxiosInteceptors({ normalID });

// setInterval(async () => {
//   // 定时刷新token，目前定位60分钟
//   try {
//     const res = await getUserInfo();
//     await refreshToken(res.data.data.refresh_token);
//   } catch (e) {
//     console.log('[DEBUG] token刷新失败');
//   }
// }, 1000 * tokenRefreshInterval);

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(Antd);
Vue.mixin(HookMixinBaseComponent);

// 设置全局提示的最大数量及时长
/* tslint:disable */
message.config({
  duration: 3,
  maxCount: 1, // 先hack修复一下 不然会弹出多个一样的框 出现这个的原因是多次处理了错误数据
  prefixCls: 'industryAnt-message',
} as any);
notification.config({
  duration: 6,
  placement: 'topRight',
});
/* tslint:enable */

if (!isMicroApp) {
  new Vue({
    router,
    store,
    render: h => h(App),
    provide: {
      privateConfig,
    },
  }).$mount('#app');
  (window as any).__hooksCommonParams__ = privateConfig;
}

console.log('process', process.env);

// 导出 qiankun 生命周期
export const bootstrap = async () => {
  console.log('[chatbot] bootstrap');
};

export const mount = async (props: any) => {
  console.log('[chatbot] mount', props, props.container.querySelector('#app'));

  // 删除不能序列化的内容
  normalizeObject(props.mainAppState);
  const { container, ASPConfig } = props;
  // 作为微应用运行
  vueInstance = new Vue({
    router: createRouter(props),
    store,
    provide: {
      privateConfig: ASPConfig,
    },
    render: h => h(App),
    data: {
      ...props,
    },
  });
  (window as any).microAppProps = props;
  (window as any).__hooksCommonParams__ = ASPConfig;
  console.log(container ? container.querySelector('#app') : document.querySelector('#app'), 'app');
  vueInstance?.$mount(container ? container.querySelector('#app') : document.querySelector('#app'));
};

export const unmount = async (props: any) => {
  if (vueInstance) {
    vueInstance.$destroy();
    vueInstance.$el.innerHTML = '';
    vueInstance = null;
  }

  // ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
};

export const update = async (props: any) => {
  // 重新渲染后续改造
  normalizeObject(props.mainAppState);
  const { container, ASPConfig } = props;
  (window as any).microAppProps = props;
  vueInstance?.$destroy();
  // 作为微应用运行
  vueInstance = new Vue({
    router,
    store,
    provide: {
      privateConfig: ASPConfig,
    },
    render: h => h(App),
    data: {
      ...props,
    },
  });
  (window as any).__hooksCommonParams__ = ASPConfig;
  vueInstance?.$mount(container ? container.querySelector('#app') : document.querySelector('#app'));
};
