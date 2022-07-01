import en from './en.json';
import zhCn from './zh-cn.json';

let locales = en;

if (process.env.REACT_APP_LANG === 'CN') {
	locales = zhCn;
}

export default locales;
