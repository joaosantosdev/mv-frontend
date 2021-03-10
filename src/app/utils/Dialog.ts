import Swal from 'sweetalert2';
import {SweetAlertOptions} from 'sweetalert2';

export class Dialog {
  static async message(params: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const titles = {
        error: 'AVISO',
        warning: 'ATENÇÃO',
        info: 'INFORMAÇÃO',
        success: 'SUCESSO'
      };
      const classHeader = `header ${params.classHeader} ${params.type}`;
      const classBody = `body ${params.classBody}`;
      const classFooter = `footer ${params.type}`;

      const getMessages = () => {
        if (Array.isArray(params.message)) {
          return params.message;
        } else if (typeof params.message === 'string') {
          return [params.message];
        }
      };

      const getTextMessage = () => {
        let vreturn = '';
        for (const m of getMessages()) {
          vreturn += `<div class="text-message">${m}</div>`;
        }
        return vreturn;
      };
      const getTitle = () => params.title ? params.title : titles[params.type];
      window['closeDialogAlert'] = (isOk) => {
        Swal.close();
        if (isOk) {
          resolve(true);

        } else {
          resolve(false);
        }
      };
      const textOk = (params.btnTextOk || 'OK');
      const textCancelar = (params.btnTextCancelar || 'Cancelar');
      const getButtons = () => {
        if (params.confirm) {
          return `<button class="btn-ok" onclick="window.closeDialogAlert(true)">${textOk}</button> <button class="btn-cancel" onclick="closeDialogAlert()">${textCancelar}</button>`;
        } else {
          return `<button class="btn-ok" onclick="window.closeDialogAlert(true)">${textOk}</button>`;
        }
      };

      const dl: SweetAlertOptions = {
        customClass: {
          content: 'dialog-alert-container'
        },
        html: `
                <div class="dialog-alert">
                            <div class="${classHeader}">
                                <div class="title">${getTitle()}</div>
                                <div class="icon-close" onclick="window.closeDialogAlert(false)">X</div>
                            </div>
                            <div class="${classBody}">
                               ${getTextMessage()}
                            </div>
                            <div class="${classFooter}">
                                   ${getButtons()}
                            </div>
                        </div>
                    `,
        showCancelButton: false,
        showConfirmButton: false
      };
      await Swal.fire(dl);
    });
  }

  static async info(params: any = {}): Promise<any> {
    params.type = 'info';
    return await Dialog.message(params);
  }

  static error(params: any = {}): any {
    params.type = 'info';
    Dialog.message(params);
  }

  static async confirm(params: any = {}): Promise<any> {
    params.confirm = true;
    params.type = 'error';
    return await Dialog.message(params);
  }
}
