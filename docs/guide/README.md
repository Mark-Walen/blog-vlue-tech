---
headerDepth: 4
---
# Hello VuePress

## 目录结构

VuePress 遵循 “约定优于配置” 的原则，推荐的目录结构如下：

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

> **注意**
> <br/>请留意目录名的大写。

*` docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。

* `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
* `docs/.vuepress/theme`: 用于存放本地主题。
* `docs/.vuepress/styles`: 用于存放样式相关的文件。
* `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
* `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
* `docs/.vuepress/public`: 静态资源目录。
* `docs/.vuepress/templates`: 存储 HTML 模板文件。
* `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
* `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
* `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 YML 或 toml。
* `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。

### 默认的页面路由

此处我们把 `docs` 目录作为 `targetDir` （参考 命令行接口），下面所有的“文件的相对路径”都是相对于 `docs` 目录的。在项目根目录下的 `package.json` 中添加 `scripts` ：

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

对于上述的目录结构，默认页面路由地址如下：

| 文件的相对路径   | 页面路由地址 |
| ---------------- | ------------ |
| /README.md       | /            |
| /guide/README.md | /guide/      |
| /config.md       | /config.html |

## 基本配置

### 配置文件

Vuepress 内置了基于 headers 的搜索——它会自动为所有页面的标题、`h2`、`h3`构建起一个简单的搜索索引。所有可配置的选项：[配置](https://www.vuepress.cn/config/#temp)

### 主题配置

默认主题提供了一些选项，自定义导航栏、侧边栏和首页等。[默认主题](https://www.vuepress.cn/theme/default-theme-config.html#首页)，如果想开发一个自定义主题，可以参考[自定义主题](https://www.vuepress.cn/theme/)

### 应用级别的配置

VuePress 是一个标准的 Vue 应用，可以通过创建一个 `.vuepress/enhanceApp.js`文件做一些应用级别的配置，当文件存在的时候，会被导入到应用的内部。

## 静态资源

### 相对路径

所有的 Markdown 文件都会被 webpack 编译成 Vue 组件，应该更倾向于使用相对路径来引用所有的静态资源。

```md
![An image](./image.png)
```

同样地，在`*.vue`文件中一样可以工作，图片会被`url-loader`和`file-loader`处理。

除此之外，还可以使用`~`前缀来明确地指出这是一个 webpack 的模块请求。

### 公共文件

有时，你可能需要提供一个静态资源，但是它们并不直接被你的任何一个 markdown 文件或者主题组件引用 —— 举例来说，favicons 和 PWA 的图标，在这种情形下，你可以将它们放在 `.vuepress/public` 中， 它们最终会被复制到生成的静态文件夹中。

### 基础路径

如果你的网站会被部署到一个**非根路径**，你将需要在 `.vuepress/config.js` 中设置 `base`，举例来说，如果你打算将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 的值就应该被设置为 `"/bar/"` (应当总是以斜杠开始，并以斜杠结束)。

有了基础路径（Base URL），如果你希望引用一张放在 `.vuepress/public` 中的图片，你需要使用这样路径：`/bar/image.png`，然而，一旦某一天你决定去修改 `base`，这样的路径引用将会显得异常脆弱。为了解决这个问题，VuePress 提供了内置的一个 helper `$withBase`（它被注入到了 Vue 的原型上），可以帮助你生成正确的路径：

```vue
<img :src="$withBase('/foo.png')" alt="foo">
```

值得一提的是，你不仅可以在你的 Vue 组件中使用上述的语法，在 Markdown 文件中亦是如此。

最后补充一句，一个 `base` 路径一旦被设置，它将会自动地作为前缀插入到 `.vuepress/config.js` 中所有以 `/` 开始的资源路径中。

## Markdown 扩展

### Header Anchors

所有的标题将会自动地应用 anchor 链接，anchor 的渲染可以通过 [`markdown.anchor`](https://vuepress.vuejs.org/zh/config/#markdown-anchor) 来配置。

### 链接

#### 内部链接

网站内部的链接，将会被转换成 `<router-link>` 用于 SPA 导航。同时，站内的每一个文件夹下的 `README.md` 或者 `index.md` 文件都会被自动编译为 `index.html`，对应的链接将被视为 `/`。

以如下的文件结构为例：

```text
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

假设你现在在 `foo/one.md` 中：

```md
[Home](/) <!-- 跳转到根部的 README.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
```

#### 链接的重定向

VuePress 支持重定向到干净链接。如果一个链接 `/foo` 找不到，VuePress 会自行寻找一个可用的 `/foo/` 或 `/foo.html`。反过来，当 `/foo/` 或 `/foo.html` 中的一个找不到时，VuePress 也会尝试寻找另一个。借助这种特性，我们可以通过官方插件 [vuepress-plugin-clean-urls (opens new window)](https://vuepress.github.io/plugins/clean-urls/)定制你的网站路径。

> **注意**
>
> 无论是否使用了 permalink 和 clean-urls 插件，你的相对路径都应该依赖于当前的文件结构来定义。在上面的例子中，即使你将 `/foo/one.md` 的路径设为了 `/foo/one/`，你依然应该通过 `./two.md` 来访问 `/foo/two.md`。

#### 页面后缀

生成页面和内部链接时，默认使用 `.html` 作为后缀。

你可以通过 [config.markdown.pageSuffix](https://vuepress.vuejs.org/zh/config/#markdown-pagesuffix) 进行自定义配置.

#### 外部链接

外部的链接将会被自动地设置为 `target="_blank" rel="noopener noreferrer"`:

- [vuejs.org(opens new window)](https://vuejs.org/)
- [VuePress on GitHub(opens new window)](https://github.com/vuejs/vuepress)

你可以自定义通过配置 [config.markdown.externalLinks](https://vuepress.vuejs.org/zh/config/#markdown-externallinks) 来自定义外部链接的特性。

### Front Matter

VuePress 提供了对 [YAML front matter (opens new window)](https://jekyllrb.com/docs/frontmatter/)开箱即用的支持:

```yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

### Emoji

**输入**

```text
:tada: :100:
```

**输出**

🎉 💯

你可以在[这个列表 (opens new window)](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)找到所有可用的 Emoji。

### 目录

输入

[[toc]]
目录（Table of Contents）的渲染可以通过 markdown.toc 选项来配置。
自定义容器 默认主题

### 自定义容器

输入

```md
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::
```

**输出**

提示

这是一个提示

注意

这是一个警告

警告

这是一个危险警告

~~~md
::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::
~~~

### 代码块中的语法高亮

VuePress 使用了 [Prism (opens new window)](https://prismjs.com/)来为 markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名：

**输入**

~~~text
``` js
export default {
  name: 'MyComponent',
  // ...
}
```
~~~

**输出**

```js
export default {
  name: 'MyComponent',
  // ...
}
```

**输入**

~~~text
``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
~~~

**输出**

```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

在 Prism 的网站上查看 [合法的语言列表 (opens new window)](https://prismjs.com/#languages-list)。

### 代码块中的行高亮

**输入**

~~~text
``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
~~~

**输出**

```js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行以外，你也可指定多行，行数区间，或是两者都指定。

- 行数区间: 例如 `{5-8}`, `{3-10}`, `{10-17}`
- 多个单行: 例如 `{4,7,9}`
- 行数区间与多个单行: 例如 `{4,7-13,16,23-27,40}`

**Input**

~~~text
``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
~~~

**Output**

```js
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

### 行号

你可以通过配置来为每个代码块显示行号：

```js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

- 示例:
![image](https://www.vuepress.cn/line-numbers-desktop.png)

### 导入代码段 beta

[详情](https://vuepress.vuejs.org/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E6%AE%B5)

> **注意**
>
> 由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，此处的 `@` 默认值是 `process.cwd()`。

## 进阶配置

VuePress 使用 [markdown-it (opens new window)](https://github.com/markdown-it/markdown-it)来渲染 Markdown，上述大多数的拓展也都是通过自定义的插件实现的。想要进一步的话，你可以通过 `.vuepress/config.js` 的 `markdown` 选项，来对当前的 `markdown-it` 实例做一些自定义的配置：

```js
module.exports = {
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```