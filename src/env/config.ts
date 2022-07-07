type Config = {
	env: string;
	apiHost: string;
	cmsTag: string;
};

const dev = {
	env: 'dev',
	apiHost: 'http://192.168.11.236:8080',
	cmsTag: `DEV ${process.env.REACT_APP_CMS_TAG}`,
};

const uat = {
	env: 'uat',
	apiHost: '//api-uat-mai.tvb.com',
	cmsTag: `UAT ${process.env.REACT_APP_CMS_TAG}`,
};

const prod = {
	env: 'prod',
	apiHost: '//api-mai.tvb.com',
	cmsTag: `PROD ${process.env.REACT_APP_CMS_TAG}`,
};

const env = (): Config => {
	if (process.env.REACT_APP_ENV === 'uat') {
		return uat;
	} else if (process.env.REACT_APP_ENV === 'prod') {
		return prod;
	}
	return dev;
};

export default env();
