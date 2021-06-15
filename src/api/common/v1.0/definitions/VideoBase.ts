import Thumbnail from './Thumbnail'


export default class VideoBase {

  /**
   * -
   */
    public coverUrl!: string

  /**
   * -
   */
    public creationTime!: string

  /**
   * -
   */
    public duration!: string

  /**
   * -
   */
    public mediaType!: string

  /**
   * -
   */
    public outputType!: string

  /**
   * -
   */
    public status!: string

  /**
   * -
   */
    public thumbnailList!: Thumbnail[]

  /**
   * -
   */
    public title!: string

  /**
   * -
   */
    public transcodeMode!: string

  /**
   * -
   */
    public videoId!: string

}
