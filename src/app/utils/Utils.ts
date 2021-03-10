export default class Utils {
  public static setToken(token): void {
    localStorage.setItem('token', token);
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
}
