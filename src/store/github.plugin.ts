import { PiniaPluginContext } from 'pinia'
import Pizzly from 'pizzly-js'

class Github {
  readonly PIZZLY_HOSTNAME: string = 'https://youcan-coding-challenge.herokuapp.com'
  readonly PIZZLY_PUBLISHABLE_KEY: string = ''
  readonly PIZZLY_SETUP_ID_GITHUB_DEMO_APP: string = 'e2df8c0b-a412-41b9-b762-643bd565e494'
  readonly pizzly: Pizzly = new Pizzly()
  static secretKey: string = 'secure-secret-key'
  constructor() {
    this.pizzly = new Pizzly({
      host: this.PIZZLY_HOSTNAME,
      // publishableKey: this.PIZZLY_PUBLISHABLE_KEY
    });
  }
  api() {
    return this.pizzly.integration('github');
  }
  connect() {
    return this.api().connect() // Connect to GitHub
  }

  async get(path: string) {
    return this.api().auth(Github.secretKey).get(path).then((response) => {
      // try {
      //   console.log('response.headers:',  JSON.stringify(response.headers));
      // } catch (err) {
      //   console.warn(err);
      // }
      return response.json();
    })
  }
  async fetchProfile(authId: string) {
    Github.secretKey = authId;
    let path = `/user`;
    return this.get(path);
  }
}

export function github(context: PiniaPluginContext) {
  return {
    github: new Github()
  }
}
