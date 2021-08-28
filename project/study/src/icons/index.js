import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue"

Vue.component('svg-icon',SvgIcon);

//拿到svg目录下第一层的所有文件名称
const req = require.context('./svg',false,/\.svg$/);
//遍历名称并导入文件内容
req.keys().map(req)