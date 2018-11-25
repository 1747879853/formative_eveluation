import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import axios from './libs/ajax'; 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'
// import cascaderMulti from "cascader-multi";

//// 生产环境中注释掉以下语句
import '../mock/index.js';

// Vue.use(cascaderMulti)
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak: 'lYpbye8GuExR4olb3XmG2yGAmgI1BM4c'
  })

// 注册组件到Vue
Vue.prototype.$axios = axios;

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
// iView 相关的全局配置
// message 配置
iView.Message.config({
  top: 50,
  duration: 3
})
// notice 配置
iView.Notice.config({
  top: 50,
  duration: 3
})
// LoadingBar 配置
iView.LoadingBar.config({
  // color: '#5cb85c',
  // failedColor: '#f0ad4e',
  height: 3
})

