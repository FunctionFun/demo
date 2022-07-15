/** 辅助工具类 */
export class Utils {
  /** 判断是否为空 */
  public static isEmpty(value: any): boolean {
    if (typeof value === 'undefined' || value == null || value === '') {
      return true;
    } else {
      return false;
    }
  }
}
