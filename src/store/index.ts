import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import actions from './actions'
import getters from './getters'
import state, { State } from './state'
import mutations from './mutations'
import { VuexWrapper } from 'vma-assist/dist/static/js/tools/vue'
import { namespace } from 'vuex-class'

Vue.use(Vuex)

const store: StoreOptions<State> = {
  state,
  mutations,
  actions,
  getters,
}

export const customerStore = namespace('customer')
export const commonStore = namespace('common')

export default new VuexWrapper<State>(store).store
