import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: (): user => {
    return {
      authId: '',
      login: '',
      name: '',
      bio: '',
      avatar_url: '',
      location: '',
      repos: new Array<repository>(),
    }
  },
  getters: {
    getAuthId: (state) => {
      return state.authId ? state.authId : state.authId = localStorage.authId;
    },
    isConnected: (state) => {
      return Boolean(state.authId) || localStorage.hasOwnProperty("authId")
    },
    getUsername: (state) => state.login,
  },
  actions: {
    async connect(): Promise<{ authId: string }> {
      return this.github.connect().then((res: any) => {
        this.authId = res.authId;
        return localStorage.authId = res.authId;
      }).catch((error: any) => console.error('It failed!', error))
    },
    async fetchProfile(): Promise<user> {
      return this.github.fetchProfile(this.getAuthId).then((res: user) => Object.assign(this, res))
    },
  },
});

export type user = {
  authId: string,
  login: string,
  name: string,
  bio: string,
  avatar_url: string,
  location: string,
  repos: repository[]
}
