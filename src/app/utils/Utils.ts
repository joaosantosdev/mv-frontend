export default class Utils {
  public static setToken(token): void {
    localStorage.setItem('token', token);
  }

  public static deleteToken(): void {
    localStorage.removeItem('token');
  }

  public static getToken(): string {
    return localStorage.getItem('token');
  }

  static validateFields(controls): any {
    Object.keys(controls).map(key => {
      controls[key].markAsTouched();
      controls[key].markAsDirty();
    });
  }

  public static formatParams(params): string {
    if (!params) {
      return '';
    }
    let vReturn = '?';
    let i = 0;
    Object.keys(params).map(key => {
      if (i !== 0) {
        vReturn += '&';
      }
      vReturn += key + '=' + params[key];
      i++;
      return key;
    });
    return vReturn;
  }
}
