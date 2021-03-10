export default class Const {
  static listStatus = [
    {label: 'Ativo', id: 'ACTIVE'},
    {label: 'Inativo', id: 'INACTIVE'},
  ];
  static status = {
    ACTIVE: 'ACTIVE',
    INATIVE: 'INATIVE',
    DELETED: 'DELETED',
  };
  static listTypesPhone = [
    {label: 'Residencial', id: true},
    {label: 'Celular', id: false},
  ];
  static httpStatus = {
    forbidden: 403
  };
}
