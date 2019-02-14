export class MediaMock {
  public src: string = '';

  // tslint:disable:variable-name
  private _oncanplaythrough: Function;

  // tslint:disable:variable-name
  private _onerror: Function;

  private fakeTime = 2000;

  constructor() {
    this._oncanplaythrough = () => {};
    this._onerror = () => {};
  }

  set oncanplaythrough(handler: Function) {
    this._oncanplaythrough = handler;

    setTimeout(() => handler(), this.fakeTime);
  }

  set onerror(handler: Function) {
    this._onerror = handler;
  }

  get onerror() {
    return this._onerror();
  }
}
