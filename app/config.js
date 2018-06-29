/**
 * [module]小程序配置文件
 */

// 此处主机域名
var host = 'https://127.0.0.1:8081';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        //主机地址
        host,

        // 微信解密地址
        decodeUrl: `${host}/decrypt`,

        // 数据请求地址
        requestUrl: `${host}/wxapp/index.php`,

        //静态资源路径
        imageUrl: `http://5b0988e595225.cdn.sohucs.com/images/20170924/7fa9f75a70fa45c394238d09a8717984.jpeg`,

    }
};

module.exports = config;