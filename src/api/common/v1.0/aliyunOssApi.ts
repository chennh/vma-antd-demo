import axios, { AxiosRequestConfig } from 'axios'
import AliyunVodConfigResp from './definitions/AliyunVodConfigResp'
import AliyunOssGetPlayInfoParam from './params/AliyunOssGetPlayInfoParam'
import GetPlayInfoResponse from './definitions/GetPlayInfoResponse'
import AliyunOssGetVideoPlayAuthParam from './params/AliyunOssGetVideoPlayAuthParam'
import GetVideoPlayAuthResponse from './definitions/GetVideoPlayAuthResponse'
import AliyunVideoTokenReq from './definitions/AliyunVideoTokenReq'
import AliyunVodTokenBO from './definitions/AliyunVodTokenBO'
import CreateUploadVideoResponse from './definitions/CreateUploadVideoResponse'
import AliyunOssRefreshVideoTokenParam from './params/AliyunOssRefreshVideoTokenParam'
import RefreshUploadVideoResponse from './definitions/RefreshUploadVideoResponse'

export class AliyunOssApi {

  /**
   * 获取配置
   *
   * @reutrn { Promise<AliyunVodConfigResp> }
   */
  public static getConfig(config?: AxiosRequestConfig): Promise<AliyunVodConfigResp> {
    return axios(Object.assign({
      url: `/common/v1.0/aliyun_oss/vod/config`,
      method: 'post',
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 获取视频播放地址
   *
   * @param { AliyunOssGetPlayInfoParam } params
   * @reutrn { Promise<GetPlayInfoResponse> }
   */
  public static getPlayInfo(
    params: AliyunOssGetPlayInfoParam,
    config?: AxiosRequestConfig): Promise<GetPlayInfoResponse> {
    return axios(Object.assign({
      url: `/common/v1.0/aliyun_oss/vod/video/play/${params.videoId}`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 获取视频播放凭证
   *
   * @param { AliyunOssGetVideoPlayAuthParam } params
   * @reutrn { Promise<GetVideoPlayAuthResponse> }
   */
  public static getVideoPlayAuth(
    params: AliyunOssGetVideoPlayAuthParam,
    config?: AxiosRequestConfig): Promise<GetVideoPlayAuthResponse> {
    return axios(Object.assign({
      url: `/common/v1.0/aliyun_oss/vod/video/play_auth/${params.videoId}`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 获取视频token
   *
   * @param { AliyunVideoTokenReq } data
   * @reutrn { Promise<AliyunVodTokenBO<CreateUploadVideoResponse>> }
   */
  public static getVideoToken(
    data: AliyunVideoTokenReq,
    config?: AxiosRequestConfig): Promise<AliyunVodTokenBO<CreateUploadVideoResponse>> {
    return axios(Object.assign({
      url: `/common/v1.0/aliyun_oss/vod/video/token`,
      method: 'post',
      data,
      responseType: 'json'
    }, config)) as any
  }

  /**
   * 刷新视频token
   *
   * @param { AliyunOssRefreshVideoTokenParam } params
   * @reutrn { Promise<AliyunVodTokenBO<RefreshUploadVideoResponse>> }
   */
  public static refreshVideoToken(
    params: AliyunOssRefreshVideoTokenParam,
    config?: AxiosRequestConfig): Promise<AliyunVodTokenBO<RefreshUploadVideoResponse>> {
    return axios(Object.assign({
      url: `/common/v1.0/aliyun_oss/vod/video/token/${params.videoId}`,
      method: 'get',
      params,
      responseType: 'json'
    }, config)) as any
  }

}
