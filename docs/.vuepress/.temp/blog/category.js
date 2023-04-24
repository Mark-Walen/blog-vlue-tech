export const categoryMap = {"category":{"/":{"path":"/category/","map":{"Guide":{"path":"/category/guide/","keys":["v-51478896"]},"数据结构":{"path":"/category/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/","keys":["v-4920bc0c"]}}},"/en/":{"path":"/en/category/","map":{}}},"tag":{"/":{"path":"/tag/","map":{}},"/en/":{"path":"/en/tag/","map":{}}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
  });


