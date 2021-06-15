import axios, { AxiosRequestConfig } from 'axios'
import VersionGetLastVersionParam from './params/VersionGetLastVersionParam'
import VersionGetLastVersionResp from './definitions/VersionGetLastVersionResp'

export class VersionApi {

  /**
   * 获取最新版本
   *
   * @param { VersionGetLastVersionParam } params
   * @reutrn { Promise<VersionGetLastVersionResp> }
   */
  public static getLastVersion(
    params: VersionGetLastVersionParam,
    config?: AxiosRequestConfig): Promise<VersionGetLastVersionResp> {
    return axios(Object.assign({
      url: `/common/v1.0/version/last`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

}
