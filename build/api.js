const buildTS = require('vma-assist/dist/static/buildApi/index').default
const path = require('path')

buildTS({
  swagger: {
    domain: 'http://39.100.13.36:54001',
    // resourceFilter: resource => ['管理后台接口'].includes(resource.name)
  },
  template: {
    output: path.resolve(__dirname, '../src/api'),
  }
})