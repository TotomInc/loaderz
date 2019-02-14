export class ImageMock {
  public src: string = '';

  // tslint:disable:variable-name
  private _onload: Function;

  // tslint:disable:variable-name
  private _onerror: Function;

  private fakeTime = 2000;

  constructor() {
    this._onload = () => {};
    this._onerror = () => {};
  }

  /**
   * When setting the `Image.onload`, store the handler into an internal
   * variable and instantly call the handler with a timeout to fake the
   * *fetching time*, so the promise won't be resolved instantly.
   */
  set onload(handler: Function) {
    this._onload = handler;

    setTimeout(() => handler(), this.fakeTime);
  }

  set onerror(handler: Function) {
    this._onerror = handler;
  }

  get onerror() {
    return this._onerror();
  }
}
