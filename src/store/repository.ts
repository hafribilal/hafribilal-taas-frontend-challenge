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
    async setRepository(repo?: repository): Promise<repository> {
      return new Promise<repository>(resolve => {
        resolve(Object.assign(this, repo))
        this.branches = new Array<branche>();
        this.commits = new Array<commit>();
      }).then(res => {
        this.fetchBranches();
        this.fetchCommits();
        return res;
      });
    },
    async setRepositoryById(repositoryId?: number): Promise<repository> {
      const index = this.getUser.repos.findIndex(r => r.id === repositoryId);
      const repo = this.getUser.repos[index];
      return this.setRepository(repo);
    },
    fetchRepositories(): Array<repository> {
      return this.github.fetchRepositories(this.getUser.getAuthId)
        .then((res: Array<repository>) => {
          res.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          this.setRepository(res[0]);
          return res;
        });
    },
    fetchBranches(): Array<branche> {
      return this.github.fetchRepositoryBranches(this.getUser.getAuthId, this.full_name)
        .then((res: Array<branche> | branche) => {
          if (Array.isArray(res)) {
            this.branches = res.map(branche => {
              return {
                name: branche.name,
                protected: branche.protected,
                sha: branche.commit.sha
              }
            });
          } else {
            this.branches.push({
              name: res.name,
              protected: res.protected,
              sha: res.commit.sha
            });
          }
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
