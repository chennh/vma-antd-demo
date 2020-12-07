import config from '../config'

export default config.toolbar.map(item => {
  if (typeof item !== 'string' && item.name === 'insert') {
    item.items.push('ContentForm')
  }
  return item
})
