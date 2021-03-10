import {FormControl} from '@angular/forms';

export default class ValidatorsUtils {
  static noEmptyString(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {required: true};
  }
}
