fis.match('*.sass', {
  // fis-parser-less 插件进行解析
  parser: fis.plugin('sass'),
  // .less 文件后缀构建后被改成 .css 文件
  rExt: '.css'
})
