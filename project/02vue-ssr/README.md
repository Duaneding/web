# 自行实现的一个vue-ssr-spa应用
# 优点：seo友好、首屏到达时间
# 缺点：复杂度，服务器性能（1.缓存优化，2.监控cpu和内存，降级优化，3.静态化优化）

# seo优化:
#   1.不一定是ssr，pre-render,
#   2.检测爬虫 -> puppeteer -> spa
#   3.nuxt.js