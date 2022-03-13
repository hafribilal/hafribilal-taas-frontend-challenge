import { defineStore } from 'pinia'
import { useUser, user } from './user';
import dayjs from 'dayjs'

// const _user = useUser();

export const useRepository = defineStore('repository', {
  state: (): repository => {
    return {
      id: 0,
      name: '',
      full_name: '',
      description: '',
      branches: Array<branche>(),
      commits: Array<commit>(),
      default_branch: 'master',
      downloads_url: '',
      has_pages: false,
      created_at: new Date(),
    }
  },
  getters: {
    getUser: () => useUser(),
    getTimeline: (state) => state.commits.reduce(function(r, a) {
      const date = dayjs(a.date).format('YYYY-MM-DD');

      r[date] = r[date] || [];
      r[date].push(a);
      return r;
    }, Object.create(null)),
    getDefaultBranche: (state) => state.default_branch
  },
  actions: {
    fetchRepositories(): Array<repository> {
      return this.github.fetchRepositories(this.getUser.getAuthId)
        .then((res: Array<repository>) => {
          res.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          Object.assign(this, res[0]);
          return res;
        });
    },
  }
})

export type repository = {
  id: number,
  name: string,
  full_name: string,
  description: string,
  branches: branche[],
  commits: commit[],
  default_branch: string,
  downloads_url: string,
  has_pages: boolean,
  created_at: Date,
}

export type commit = {
  author: user,
  message: string,
  description?: string,
  verification: { verified: boolean },
  comment_count: 0,
  date: Date,
  sha: string
}

export type branche = {
  name: string,
  protected: boolean,
  sha: string,
}
