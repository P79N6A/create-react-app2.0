# IE TroubShot

### MATERIAL-UI

---

关于 material-ui 在 IE 中的问题集合，
写在这里供后人乘凉

---

-   Icon 组件不能够绑定 onClick 事件。
-   浏览器兼容性问题，flex 布局存在兼容，例如加 -ms-flexbox
-   在 IE 下，boostrap 风格的 Icon 会出现无法加载的情况，在 HTML 文件中[添加 meta 标签解决](https://stackoverflow.com/questions/31291414/font-awesome-icon-is-not-appearing-in-ie-11-but-showing-in-other-browsers)，或者换用 SVG 格式的图片。

### DOM-TO-IMAGE

---

生成屏幕截图的 JS 库。

---

-   不支持 IE
