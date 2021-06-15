import PlayInfo from './PlayInfo'
import VideoBase from './VideoBase'


export default class GetPlayInfoResponse {

  /**
   * -
   */
    public playInfoList!: PlayInfo[]

  /**
   * -
   */
    public requestId!: string

  /**
   * -
   */
    public videoBase!: VideoBase

}
