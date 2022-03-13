import { defineStore } from 'pinia'
import { useRepository, repository } from './repository';

// const _repository = useRepository();

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
    getRepoTitles: (state) => {
      return state.repos.map(repo => repo.name);
    },
    getCurrentRepository: (): any => useRepository()
  },
  actions: {
    search(value: string, option: string = 'name'): Array<repository> {
      if (Boolean(value)) {
        switch (option) {
          case 'name':
            return this.repos.filter(repo => repo.name.includes(value));
            break;
          default:
            return this.repos;
            break;
        }
      } else {
        return this.repos;
      }
    },
    async connect(): Promise<{ authId: string }> {
      return this.github.connect().then((res: any) => {
        this.authId = res.authId;
        return localStorage.authId = res.authId;
      }).catch((error: any) => console.error('It failed!', error))
    },
    async fetchProfile(): Promise<user> {
      return this.github.fetchProfile(this.getAuthId).then((res: user) => Object.assign(this, res))
    },
    async fetchRepositories(): Promise<Array<repository>> {
      return this.getCurrentRepository.fetchRepositories().then((res: Array<repository>) => this.repos = res)
    }
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
