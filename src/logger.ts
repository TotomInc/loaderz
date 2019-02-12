/**
 * Alternative to the default `console.log()` but with extra styling to
 * differentiate logs from loaderz and something else.
 */
export class Logger {
  /**
   * Log something in the console like you would do with `console.log()`, but
   * with extra styling.
   *
   * @param messages messages to send (includes variables)
   */
  public log(...messages: any[]) {
    const args: any[] = [].slice.call(messages);

    args.unshift(
      '%c[loaderz]%c',
      'color: #57AE5B; font-weight: bold;',
      'color: #05400A; font-weight: normal;',
    );

    console.log(...args);
  }

  /**
   * Log something in the console like you would do with `console.warn()`, but
   * with extra styling, with the warn background and a siren emoji.
   *
   * @param messages messages to send (includes variables)
   */
  public warn(...messages: any[]) {
    const args: any[] = [].slice.call(messages);

    args.unshift(
      '%c[loaderz]%c 🚨',
      'color: #F6B93B; font-weight: bold;',
      'color: #05400A; font-weight: normal;',
    );

    console.log(...args);
  }
}
