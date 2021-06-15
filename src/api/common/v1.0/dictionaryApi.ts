import axios, { AxiosRequestConfig } from 'axios'
import DictionaryListByCategoryGroupParam from './params/DictionaryListByCategoryGroupParam'
import Dictionary from './definitions/Dictionary'
import DictionaryGetByCategoryGroupKeyParam from './params/DictionaryGetByCategoryGroupKeyParam'
import DictionaryGetByGroupKeyParam from './params/DictionaryGetByGroupKeyParam'

export class DictionaryApi {

  /**
   * 年级列表: {category=SYSTEM, grade=grade}
   *
   * @param { DictionaryListByCategoryGroupParam } params
   * @reutrn { Promise<Dictionary[]> }
   */
  public static listByCategoryGroup(
    params: DictionaryListByCategoryGroupParam,
    config?: AxiosRequestConfig): Promise<Dictionary[]> {
    return axios(Object.assign({
      url: `/common/v1.0/dictionary/category/group`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 根据category-group-key读取字典
   *
   * @param { DictionaryGetByCategoryGroupKeyParam } params
   * @reutrn { Promise<Dictionary> }
   */
  public static getByCategoryGroupKey(
    params: DictionaryGetByCategoryGroupKeyParam,
    config?: AxiosRequestConfig): Promise<Dictionary> {
    return axios(Object.assign({
      url: `/common/v1.0/dictionary/category/group/key`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 用户协议: {group=setting, key=user_agreement};
   * 隐私策略: {group=setting, key=privacy_policy}
   * 关于我们: {group=setting, key=about_us}
   *
   * @param { DictionaryGetByGroupKeyParam } params
   * @reutrn { Promise<Dictionary> }
   */
  public static getByGroupKey(
    params: DictionaryGetByGroupKeyParam,
    config?: AxiosRequestConfig): Promise<Dictionary> {
    return axios(Object.assign({
      url: `/common/v1.0/dictionary/group/key`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

}
