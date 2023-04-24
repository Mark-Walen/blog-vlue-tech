<template><div><h1 id="hello-vuepress" tabindex="-1"><a class="header-anchor" href="#hello-vuepress" aria-hidden="true">#</a> Hello VuePress</h1>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<p>VuePress 遵循 “约定优于配置” 的原则，推荐的目录结构如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意</strong>
<br/>请留意目录名的大写。</p>
</blockquote>
<p>*<code v-pre> docs/.vuepress</code>: 用于存放全局的配置、组件、静态资源等。</p>
<ul>
<li><code v-pre>docs/.vuepress/components</code>: 该目录中的 Vue 组件将会被自动注册为全局组件。</li>
<li><code v-pre>docs/.vuepress/theme</code>: 用于存放本地主题。</li>
<li><code v-pre>docs/.vuepress/styles</code>: 用于存放样式相关的文件。</li>
<li><code v-pre>docs/.vuepress/styles/index.styl</code>: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。</li>
<li><code v-pre>docs/.vuepress/styles/palette.styl</code>: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。</li>
<li><code v-pre>docs/.vuepress/public</code>: 静态资源目录。</li>
<li><code v-pre>docs/.vuepress/templates</code>: 存储 HTML 模板文件。</li>
<li><code v-pre>docs/.vuepress/templates/dev.html</code>: 用于开发环境的 HTML 模板文件。</li>
<li><code v-pre>docs/.vuepress/templates/ssr.html</code>: 构建时基于 Vue SSR 的 HTML 模板文件。</li>
<li><code v-pre>docs/.vuepress/config.js</code>: 配置文件的入口文件，也可以是 YML 或 toml。</li>
<li><code v-pre>docs/.vuepress/enhanceApp.js</code>: 客户端应用的增强。</li>
</ul>
<h3 id="默认的页面路由" tabindex="-1"><a class="header-anchor" href="#默认的页面路由" aria-hidden="true">#</a> 默认的页面路由</h3>
<p>此处我们把 <code v-pre>docs</code> 目录作为 <code v-pre>targetDir</code> （参考 命令行接口），下面所有的“文件的相对路径”都是相对于 <code v-pre>docs</code> 目录的。在项目根目录下的 <code v-pre>package.json</code> 中添加 <code v-pre>scripts</code> ：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于上述的目录结构，默认页面路由地址如下：</p>
<table>
<thead>
<tr>
<th>文件的相对路径</th>
<th>页面路由地址</th>
</tr>
</thead>
<tbody>
<tr>
<td>/README.md</td>
<td>/</td>
</tr>
<tr>
<td>/guide/README.md</td>
<td>/guide/</td>
</tr>
<tr>
<td>/config.md</td>
<td>/config.html</td>
</tr>
</tbody>
</table>
<h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置" aria-hidden="true">#</a> 基本配置</h2>
<h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3>
<p>Vuepress 内置了基于 headers 的搜索——它会自动为所有页面的标题、<code v-pre>h2</code>、<code v-pre>h3</code>构建起一个简单的搜索索引。所有可配置的选项：<a href="https://www.vuepress.cn/config/#temp" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a></p>
<h3 id="主题配置" tabindex="-1"><a class="header-anchor" href="#主题配置" aria-hidden="true">#</a> 主题配置</h3>
<p>默认主题提供了一些选项，自定义导航栏、侧边栏和首页等。<a href="https://www.vuepress.cn/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5" target="_blank" rel="noopener noreferrer">默认主题<ExternalLinkIcon/></a>，如果想开发一个自定义主题，可以参考<a href="https://www.vuepress.cn/theme/" target="_blank" rel="noopener noreferrer">自定义主题<ExternalLinkIcon/></a></p>
<h3 id="应用级别的配置" tabindex="-1"><a class="header-anchor" href="#应用级别的配置" aria-hidden="true">#</a> 应用级别的配置</h3>
<p>VuePress 是一个标准的 Vue 应用，可以通过创建一个 <code v-pre>.vuepress/enhanceApp.js</code>文件做一些应用级别的配置，当文件存在的时候，会被导入到应用的内部。</p>
<h2 id="静态资源" tabindex="-1"><a class="header-anchor" href="#静态资源" aria-hidden="true">#</a> 静态资源</h2>
<h3 id="相对路径" tabindex="-1"><a class="header-anchor" href="#相对路径" aria-hidden="true">#</a> 相对路径</h3>
<p>所有的 Markdown 文件都会被 webpack 编译成 Vue 组件，应该更倾向于使用相对路径来引用所有的静态资源。</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">An image</span>](<span class="token url">./image.png</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样地，在<code v-pre>*.vue</code>文件中一样可以工作，图片会被<code v-pre>url-loader</code>和<code v-pre>file-loader</code>处理。</p>
<p>除此之外，还可以使用<code v-pre>~</code>前缀来明确地指出这是一个 webpack 的模块请求。</p>
<h3 id="公共文件" tabindex="-1"><a class="header-anchor" href="#公共文件" aria-hidden="true">#</a> 公共文件</h3>
<p>有时，你可能需要提供一个静态资源，但是它们并不直接被你的任何一个 markdown 文件或者主题组件引用 —— 举例来说，favicons 和 PWA 的图标，在这种情形下，你可以将它们放在 <code v-pre>.vuepress/public</code> 中， 它们最终会被复制到生成的静态文件夹中。</p>
<h3 id="基础路径" tabindex="-1"><a class="header-anchor" href="#基础路径" aria-hidden="true">#</a> 基础路径</h3>
<p>如果你的网站会被部署到一个<strong>非根路径</strong>，你将需要在 <code v-pre>.vuepress/config.js</code> 中设置 <code v-pre>base</code>，举例来说，如果你打算将你的网站部署到 <code v-pre>https://foo.github.io/bar/</code>，那么 <code v-pre>base</code> 的值就应该被设置为 <code v-pre>&quot;/bar/&quot;</code> (应当总是以斜杠开始，并以斜杠结束)。</p>
<p>有了基础路径（Base URL），如果你希望引用一张放在 <code v-pre>.vuepress/public</code> 中的图片，你需要使用这样路径：<code v-pre>/bar/image.png</code>，然而，一旦某一天你决定去修改 <code v-pre>base</code>，这样的路径引用将会显得异常脆弱。为了解决这个问题，VuePress 提供了内置的一个 helper <code v-pre>$withBase</code>（它被注入到了 Vue 的原型上），可以帮助你生成正确的路径：</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$withBase('/foo.png')<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得一提的是，你不仅可以在你的 Vue 组件中使用上述的语法，在 Markdown 文件中亦是如此。</p>
<p>最后补充一句，一个 <code v-pre>base</code> 路径一旦被设置，它将会自动地作为前缀插入到 <code v-pre>.vuepress/config.js</code> 中所有以 <code v-pre>/</code> 开始的资源路径中。</p>
<h2 id="markdown-扩展" tabindex="-1"><a class="header-anchor" href="#markdown-扩展" aria-hidden="true">#</a> Markdown 扩展</h2>
<h3 id="header-anchors" tabindex="-1"><a class="header-anchor" href="#header-anchors" aria-hidden="true">#</a> Header Anchors</h3>
<p>所有的标题将会自动地应用 anchor 链接，anchor 的渲染可以通过 <a href="https://vuepress.vuejs.org/zh/config/#markdown-anchor" target="_blank" rel="noopener noreferrer"><code v-pre>markdown.anchor</code><ExternalLinkIcon/></a> 来配置。</p>
<h3 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h3>
<h4 id="内部链接" tabindex="-1"><a class="header-anchor" href="#内部链接" aria-hidden="true">#</a> 内部链接</h4>
<p>网站内部的链接，将会被转换成 <code v-pre>&lt;router-link&gt;</code> 用于 SPA 导航。同时，站内的每一个文件夹下的 <code v-pre>README.md</code> 或者 <code v-pre>index.md</code> 文件都会被自动编译为 <code v-pre>index.html</code>，对应的链接将被视为 <code v-pre>/</code>。</p>
<p>以如下的文件结构为例：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设你现在在 <code v-pre>foo/one.md</code> 中：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url">[<span class="token content">Home</span>](<span class="token url">/</span>)</span> <span class="token comment">&lt;!-- 跳转到根部的 README.md --></span>
<span class="token url">[<span class="token content">foo</span>](<span class="token url">/foo/</span>)</span> <span class="token comment">&lt;!-- 跳转到 foo 文件夹的 index.html --></span>
<span class="token url">[<span class="token content">foo heading</span>](<span class="token url">./#heading</span>)</span> <span class="token comment">&lt;!-- 跳转到 foo/index.html 的特定标题位置 --></span>
<span class="token url">[<span class="token content">bar - three</span>](<span class="token url">../bar/three.md</span>)</span> <span class="token comment">&lt;!-- 具体文件可以使用 .md 结尾（推荐） --></span>
<span class="token url">[<span class="token content">bar - four</span>](<span class="token url">../bar/four.html</span>)</span> <span class="token comment">&lt;!-- 也可以用 .html --></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="链接的重定向" tabindex="-1"><a class="header-anchor" href="#链接的重定向" aria-hidden="true">#</a> 链接的重定向</h4>
<p>VuePress 支持重定向到干净链接。如果一个链接 <code v-pre>/foo</code> 找不到，VuePress 会自行寻找一个可用的 <code v-pre>/foo/</code> 或 <code v-pre>/foo.html</code>。反过来，当 <code v-pre>/foo/</code> 或 <code v-pre>/foo.html</code> 中的一个找不到时，VuePress 也会尝试寻找另一个。借助这种特性，我们可以通过官方插件 <a href="https://vuepress.github.io/plugins/clean-urls/" target="_blank" rel="noopener noreferrer">vuepress-plugin-clean-urls (opens new window)<ExternalLinkIcon/></a>定制你的网站路径。</p>
<blockquote>
<p><strong>注意</strong></p>
<p>无论是否使用了 permalink 和 clean-urls 插件，你的相对路径都应该依赖于当前的文件结构来定义。在上面的例子中，即使你将 <code v-pre>/foo/one.md</code> 的路径设为了 <code v-pre>/foo/one/</code>，你依然应该通过 <code v-pre>./two.md</code> 来访问 <code v-pre>/foo/two.md</code>。</p>
</blockquote>
<h4 id="页面后缀" tabindex="-1"><a class="header-anchor" href="#页面后缀" aria-hidden="true">#</a> 页面后缀</h4>
<p>生成页面和内部链接时，默认使用 <code v-pre>.html</code> 作为后缀。</p>
<p>你可以通过 <a href="https://vuepress.vuejs.org/zh/config/#markdown-pagesuffix" target="_blank" rel="noopener noreferrer">config.markdown.pageSuffix<ExternalLinkIcon/></a> 进行自定义配置.</p>
<h4 id="外部链接" tabindex="-1"><a class="header-anchor" href="#外部链接" aria-hidden="true">#</a> 外部链接</h4>
<p>外部的链接将会被自动地设置为 <code v-pre>target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;</code>:</p>
<ul>
<li><a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">vuejs.org(opens new window)<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/vuejs/vuepress" target="_blank" rel="noopener noreferrer">VuePress on GitHub(opens new window)<ExternalLinkIcon/></a></li>
</ul>
<p>你可以自定义通过配置 <a href="https://vuepress.vuejs.org/zh/config/#markdown-externallinks" target="_blank" rel="noopener noreferrer">config.markdown.externalLinks<ExternalLinkIcon/></a> 来自定义外部链接的特性。</p>
<h3 id="front-matter" tabindex="-1"><a class="header-anchor" href="#front-matter" aria-hidden="true">#</a> Front Matter</h3>
<p>VuePress 提供了对 <a href="https://jekyllrb.com/docs/frontmatter/" target="_blank" rel="noopener noreferrer">YAML front matter (opens new window)<ExternalLinkIcon/></a>开箱即用的支持:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> Blogging Like a Hacker
<span class="token key atrule">lang</span><span class="token punctuation">:</span> en<span class="token punctuation">-</span>US
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="emoji" tabindex="-1"><a class="header-anchor" href="#emoji" aria-hidden="true">#</a> Emoji</h3>
<p><strong>输入</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>:tada: :100:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>输出</strong></p>
<p>🎉 💯</p>
<p>你可以在<a href="https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json" target="_blank" rel="noopener noreferrer">这个列表 (opens new window)<ExternalLinkIcon/></a>找到所有可用的 Emoji。</p>
<h3 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h3>
<p>输入</p>
<nav class="table-of-contents"><ul><li><router-link to="#目录结构">目录结构</router-link><ul><li><router-link to="#默认的页面路由">默认的页面路由</router-link></li></ul></li><li><router-link to="#基本配置">基本配置</router-link><ul><li><router-link to="#配置文件">配置文件</router-link></li><li><router-link to="#主题配置">主题配置</router-link></li><li><router-link to="#应用级别的配置">应用级别的配置</router-link></li></ul></li><li><router-link to="#静态资源">静态资源</router-link><ul><li><router-link to="#相对路径">相对路径</router-link></li><li><router-link to="#公共文件">公共文件</router-link></li><li><router-link to="#基础路径">基础路径</router-link></li></ul></li><li><router-link to="#markdown-扩展">Markdown 扩展</router-link><ul><li><router-link to="#header-anchors">Header Anchors</router-link></li><li><router-link to="#链接">链接</router-link></li><li><router-link to="#front-matter">Front Matter</router-link></li><li><router-link to="#emoji">Emoji</router-link></li><li><router-link to="#目录">目录</router-link></li><li><router-link to="#自定义容器">自定义容器</router-link></li><li><router-link to="#代码块中的语法高亮">代码块中的语法高亮</router-link></li><li><router-link to="#代码块中的行高亮">代码块中的行高亮</router-link></li><li><router-link to="#行号">行号</router-link></li><li><router-link to="#导入代码段-beta">导入代码段 beta</router-link></li></ul></li><li><router-link to="#进阶配置">进阶配置</router-link></li></ul></nav>
<p>目录（Table of Contents）的渲染可以通过 markdown.toc 选项来配置。
自定义容器 默认主题</p>
<h3 id="自定义容器" tabindex="-1"><a class="header-anchor" href="#自定义容器" aria-hidden="true">#</a> 自定义容器</h3>
<p>输入</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: tip
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p>
<p>提示</p>
<p>这是一个提示</p>
<p>注意</p>
<p>这是一个警告</p>
<p>警告</p>
<p>这是一个危险警告</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
<span class="token code"><span class="token punctuation">```</span><span class="token code-language">js</span>
<span class="token code-block language-js">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'你好，VuePress！'</span><span class="token punctuation">)</span></span>
<span class="token punctuation">```</span></span>
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码块中的语法高亮" tabindex="-1"><a class="header-anchor" href="#代码块中的语法高亮" aria-hidden="true">#</a> 代码块中的语法高亮</h3>
<p>VuePress 使用了 <a href="https://prismjs.com/" target="_blank" rel="noopener noreferrer">Prism (opens new window)<ExternalLinkIcon/></a>来为 markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名：</p>
<p><strong>输入</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>``` js
export default {
  name: 'MyComponent',
  // ...
}
```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'MyComponent'</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输入</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>``` html
&lt;ul>
  &lt;li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  &lt;/li>
&lt;/ul>
```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span>
    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo in todos<span class="token punctuation">"</span></span>
    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo.id<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span>
    {{ todo.text }}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Prism 的网站上查看 <a href="https://prismjs.com/#languages-list" target="_blank" rel="noopener noreferrer">合法的语言列表 (opens new window)<ExternalLinkIcon/></a>。</p>
<h3 id="代码块中的行高亮" tabindex="-1"><a class="header-anchor" href="#代码块中的行高亮" aria-hidden="true">#</a> 代码块中的行高亮</h3>
<p><strong>输入</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">'Highlighted!'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了单行以外，你也可指定多行，行数区间，或是两者都指定。</p>
<ul>
<li>行数区间: 例如 <code v-pre>{5-8}</code>, <code v-pre>{3-10}</code>, <code v-pre>{10-17}</code></li>
<li>多个单行: 例如 <code v-pre>{4,7,9}</code></li>
<li>行数区间与多个单行: 例如 <code v-pre>{4,7-13,16,23-27,40}</code></li>
</ul>
<p><strong>Input</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>``` js{1,4,6-7}
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Output</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> <span class="token comment">// Highlighted</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">motd</span><span class="token operator">:</span> <span class="token string">'VuePress is awesome'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">lorem</span><span class="token operator">:</span> <span class="token string">'ipsum'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="行号" tabindex="-1"><a class="header-anchor" href="#行号" aria-hidden="true">#</a> 行号</h3>
<p>你可以通过配置来为每个代码块显示行号：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lineNumbers</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>示例:
<img src="https://www.vuepress.cn/line-numbers-desktop.png" alt="image" loading="lazy"></li>
</ul>
<h3 id="导入代码段-beta" tabindex="-1"><a class="header-anchor" href="#导入代码段-beta" aria-hidden="true">#</a> 导入代码段 beta</h3>
<p><a href="https://vuepress.vuejs.org/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E6%AE%B5" target="_blank" rel="noopener noreferrer">详情<ExternalLinkIcon/></a></p>
<blockquote>
<p><strong>注意</strong></p>
<p>由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，此处的 <code v-pre>@</code> 默认值是 <code v-pre>process.cwd()</code>。</p>
</blockquote>
<h2 id="进阶配置" tabindex="-1"><a class="header-anchor" href="#进阶配置" aria-hidden="true">#</a> 进阶配置</h2>
<p>VuePress 使用 <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it (opens new window)<ExternalLinkIcon/></a>来渲染 Markdown，上述大多数的拓展也都是通过自定义的插件实现的。想要进一步的话，你可以通过 <code v-pre>.vuepress/config.js</code> 的 <code v-pre>markdown</code> 选项，来对当前的 <code v-pre>markdown-it</code> 实例做一些自定义的配置：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// markdown-it-anchor 的选项</span>
    <span class="token literal-property property">anchor</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">permalink</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// markdown-it-toc 的选项</span>
    <span class="token literal-property property">toc</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">includeLevel</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">extendMarkdown</span><span class="token operator">:</span> <span class="token parameter">md</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 使用更多的 markdown-it 插件!</span>
      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'markdown-it-xxx'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


