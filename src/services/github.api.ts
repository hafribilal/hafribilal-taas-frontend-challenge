import axios from 'axios';
import { Popup } from '../utils/popup'

const client_id = '54039a5b3710db291ed2';
const client_secret = 'f75833481910b069ae9b19ef99695194dbc8693b';

const gh_api = 'https://api.github.com';

export default {
  gh_token: '',
  connect(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const url = 'https://github.com/login/oauth/authorize';
      const popup = new Popup(url, { client_id: client_id, scope: 'repo' }).open();

      if (popup) {
        popup.onload = function() {
          // on load trigger
          console.log('Popup opned');
          this.onbeforeunload = function() {
            // on before unload trigger
            console.log('Popup closed');
            // get the verification code from url
            const urlParams = new URLSearchParams(popup.location.search);
            const gh_code = urlParams.get('code');
            if (gh_code) {
              return resolve(gh_code);
            } else {
              reject(new Error('Authorization failed. That’s all we know.'))
            }
          }
        }
      }
      // check if popup is closed or not
      const popupClosedChecker = setInterval(() => {
        if (popup.closed) {
          reject(new Error('Authorization failed. The user has likely interrupted the process by closing the modal.'));
          clearInterval(popupClosedChecker);
        }
      }, 1000);
    }).then(async (gh_code) => {
      console.log('Github Code :', gh_code);
      // fetch access token :D
      // >probably catch an error (**CORS** ~ Cross-Origin Resource Sharing) -_-
      return await this.fetchAccessToken(gh_code).then((res: any) => {
        this.setAccessToken(res.access_token);
        return res
      }).catch((err) => {
        throw new Error("Whoops! CORS Error Again :'( \\n" + err.toString());
      });
    });
  },

  async fetchAccessToken(code: string) {
    return axios.post('https://github.com/login/oauth/access_token', {
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      // redirectUri: "http://localhost:3000/"
    },
      {
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    ).then(res => {
      return res.data;
    });
  },

  getAccessToken() {
    return this.gh_token ? this.gh_token : this.gh_token = localStorage.gh_token;
  },
  setAccessToken(access_token: string) {
    return localStorage.gh_token = this.gh_token = access_token;
  },

  urlBuilder(url: string, params: any = {}) {
    const _url = new URL(url);
    Object.keys(params).forEach(key => {
      // check if is not null or empty or undefined
      if (Boolean(params[key])) {
        _url.searchParams.append(key, params[key]);
      }
    });
    return _url.href;
  },
  async get(path: string, params?: any) {
    const url = this.urlBuilder(gh_api + path, params);
    return axios.get(url, { headers: { Authorization: `bearer ${this.getAccessToken()}` } })
  }

}
