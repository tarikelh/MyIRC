import * as api from "./api/index.js";

const key = "";

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const startConnect = data => api.post({ url: `/connect`, data });
