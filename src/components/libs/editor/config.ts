import {
  ckeditorUploadUrl
} from '@/config'

// https://www.cnblogs.com/Tirisfal/p/5548424.html
const defaultConfig = {
  uiColor: '#eaf5ff',
  width: '100%',
  height: '56vh',
  toolbarCanCollapse: true,
  toolbar: [{
    name: 'document',
    items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates']
  }, {
    name: 'clipboard',
    items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
  }, {
    name: 'editing',
    items: ['Find', 'Replace', 'Selection']
  }, {
    name: 'basicstyles',
    items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
  }, '/', {
    name: 'paragraph',
    items: ['NumberedList', 'BulletedList',
      '-', 'Outdent', 'Indent',
      '-', 'Blockquote', 'CreateDiv',
      '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',
      '-', 'BidiLtr', 'BidiRtl']
  }, {
    name: 'links',
    items: ['Link', 'Unlink', 'Anchor']
  }, {
    name: 'insert',
    items: ['Table', 'Image']
  }, '/', {
    name: 'styles',
    items: ['Styles', 'Format', 'Font', 'FontSize']
  }, {
    name: 'colors',
    items: ['TextColor', 'BGColor']
  }, {
    name: 'tools',
    items: ['Maximize', 'ShowBlocks']
  }],
  baseFloatZIndex: 2100,
  image_previewText: '图片预览',
  filebrowserImageUploadUrl: ckeditorUploadUrl,
  language: 'zh-cn',
  allowedContent: true,
  readOnly: false,
  extraPlugins: ['contentform']
}
export default defaultConfig
