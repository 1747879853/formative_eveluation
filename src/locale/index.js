import Vue from 'vue';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
import zhTLocale from 'iview/src/locale/lang/zh-TW';

import regionLocales from '../views/region-manage/region-locale';
import homeLocales from '../views/home/home-local';


// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const regionlocales = regionLocales
const mergeZH = Object.assign(zhLocale, locales['zh-CN'],regionlocales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US'],regionlocales['en-US']);
const mergeTW = Object.assign(zhTLocale, locales['zh-TW'],regionlocales['zh-TW']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
Vue.locale('zh-TW', mergeTW);

const hlocales = Locales;
const hregionlocales = homeLocales
const hmergeZH = Object.assign(zhLocale, hlocales['zh-CN'],hregionlocales['zh-CN']);
const hmergeEN = Object.assign(enLocale, hlocales['en-US'],hregionlocales['en-US']);
const hmergeTW = Object.assign(zhTLocale, hlocales['zh-TW'],hregionlocales['zh-TW']);
Vue.locale('zh-CN', hmergeZH);
Vue.locale('en-US', hmergeEN);
Vue.locale('zh-TW', hmergeTW);
