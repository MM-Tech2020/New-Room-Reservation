const DEV_BASE_URL = 'http://mal3ab.azurewebsites.net';
const PROD_BASE_URL = 'http://';
const DEV = true;

export const BASE_URL = DEV ? DEV_BASE_URL : PROD_BASE_URL;
