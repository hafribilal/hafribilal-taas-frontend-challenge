export class Popup {
  url = '';
  title = 'YouCan Challenge Popup';
  width = 600;
  height = 720;
  win = null;
  constructor(url, params) {
    const _url = new URL(url);
    Object.keys(params).forEach(key => {
      _url.searchParams.append(key, params[key]);
    });
    this.url = _url.href;
  }

  open() {
    const win = window.open(this.url, this.title, this.getOptions());
    if (!win) {
      alert('Please unblock wins in your browser settings to login with Github');
    } else if (window.focus) {
      win.focus();
    }
    return this.win = win;
  }

  handler() {
    // idk what exactly that will work, but it should be here anyway.
  }
  getOptions() {
    const options = {
      width: this.width,
      height: this.height
    };
    Object.assign(options, this.setPosition(options));
    const optionsStr = Object.keys(options).reduce((acc, key) => {
      acc.push(`${key}=${options[key]}`)
      return acc
    }, []).join(',');
    return optionsStr;
  }
  setPosition(options) {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen?.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen?.top;
    const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
    const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
    options.self = "_self"
    options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft;
    options.top = ((height / 2) - (options.height / 2)) + dualScreenTop;
    return options;
  }
}
