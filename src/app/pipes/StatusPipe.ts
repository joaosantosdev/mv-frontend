import {Pipe, PipeTransform} from '@angular/core';
import Const from '../utils/Const';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const status = Const.listStatus.filter(item => item.id === value);
    return status.length > 0 ? status[0].label : '';
  }

}
