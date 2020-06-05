export enum EmailActionParameter {
  mode = 'mode',
  oobCode = 'oobCode',
  apiKey = 'apiKey',
  continueUrl = 'continueUrl',
  lang = 'lang',
}

export enum EmailActionMode {
  resetPassword = 'resetPassword',
  recoverEmail = 'recoverEmail',
  verifyEmail = 'verifyEmail',
}
