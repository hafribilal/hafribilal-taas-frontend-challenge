import { defineStore } from 'pinia'
import { useRepository, repository } from './repository';

// const _repository = useRepository();

export const useUser = defineStore('user', {
  state: (): user => {
    return {
      login: '',
      name: '',
      bio: '',
      avatar_url: '',
      location: '',
      repos: new Array<repository>(),
    }
  },
  getters: {
    getUsername: (state) => state.login,
    getRepoTitles: (state) => {
      return state.repos.map(repo => repo.name);
    },
    getCurrentRepository: (): any => useRepository()
  },
  actions: {
    isConnected(): boolean {
      return this.github.isConnected();
    },
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
    // check
    async connect(): Promise<any> {
      return this.github.connect();
    },
    async fetchProfile(): Promise<user> {
      return this.github.fetchProfile().then((res: user) => Object.assign(this, res))
    },
    async fetchRepositories(): Promise<Array<repository>> {
      return this.getCurrentRepository.fetchRepositories().then((res: Array<repository>) => this.repos = res)
    }
  },
});

export type user = {
  login: string,
  name: string,
  bio: string,
  avatar_url: string,
  location: string,
  repos: repository[]
}
