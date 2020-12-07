import VmaEditor from './editor/index.vue'
import VmaComingSoon from './empty/comingSoon.vue'

export const VNodes = {
  functional: true,
  render: (h: any, ctx: any) => ctx.props.vnodes,
}
export {
  VmaEditor,
  VmaComingSoon,
}
