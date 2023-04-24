export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-7ca14673","v-3cbd8d6c","v-714cb020","v-21ca8b50","v-8526c722","v-6f98529a","v-2e1dfeee","v-701b27aa","v-49702201","v-97128938","v-184f4da6","v-2e3eac9e","v-51478896","v-05661710","v-fffb8e28","v-ca04c7b8","v-1692d978","v-4a968f1a","v-42033206","v-5bf1a160","v-43e77858","v-2a78f30a","v-4920bc0c"]},"/en/":{"path":"/en/article/","keys":["v-5aa3d8ba","v-367b840a"]}},"star":{"/":{"path":"/star/","keys":[]},"/en/":{"path":"/en/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-7ca14673","v-3cbd8d6c","v-714cb020","v-21ca8b50","v-8526c722","v-6f98529a","v-2e1dfeee","v-701b27aa","v-49702201","v-97128938"]},"/en/":{"path":"/en/timeline/","keys":[]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

