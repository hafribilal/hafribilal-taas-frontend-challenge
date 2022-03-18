import { PiniaPluginContext } from 'pinia'
import api from '../services/github.api';

class Github {
  constructor() {
    // this.isConnected();
  }
  async connect() {
    return api.connect() // Connect to GitHub
  }
  isConnected() {
    return Boolean(api.getAccessToken());
  }
  async get(path: string, params: any = {}) {
    return api.get(path, params).then((response) => {
      return response.data;
    })
  }
  async fetchProfile() {
    let path = `/user`;
    return this.get(path);
  }
  async fetchRepositories() {
    let path = `/user/repos`;
    return this.get(path);
  }
  async fetchRepositoryBranches(full_name: string) {
    let path = `/repos/${full_name}/branches`;
    return this.get(path);
  }
  async fetchRepositoryCommits(full_name: string, branche: string, pagination: { page: number, per_page: number } = { page: 1, per_page: 20 }) {
    let path = `/repos/${full_name}/commits`;
    const params = Object.assign(pagination, { sha: branche });
    return this.get(path, params);
  }
}

export function github(context: PiniaPluginContext) {
  return {
    github: new Github()
  }
}
