import { PiniaPluginContext } from 'pinia'
import Pizzly from 'pizzly-js'

class Github {
  readonly host: string = 'https://youcan-coding-challenge.herokuapp.com/auth/callback'
  readonly pizzly: Pizzly = new Pizzly()
  constructor() {
    this.pizzly = new Pizzly({ host: this.host });
  }
  api() {
    return this.pizzly.integration('github');
  }
  connect() {
    return this.api().connect() // Connect to GitHub
  }
}

export function github(context: PiniaPluginContext) {
  return {
    github: new Github()
  }
}
