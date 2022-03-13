import { defineStore } from 'pinia'
import { useUser, user } from './user';
import dayjs from 'dayjs'

// const _user = useUser();

var pagination = { page: 1, per_page: 50 };

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
    fetchCommits(branche?: string): Array<commit> {
      return this.github.fetchRepositoryCommits(this.getUser.getAuthId, this.full_name, branche, pagination)
        .then((res: Array<commit> | commit) => {
          if (Array.isArray(res)) {
            this.commits = new Array<commit>();
            this.commits = res.map(commit => {
              const val = commit.commit.message.split('\n');
              const message = val[0];
              val.shift();
              const description = val.join('\r\n');
              return {
                author: Object.assign(commit.commit.author, commit.author || {}),
                message: message,
                description: description,
                verification: commit.commit.verification,
                comment_count: commit.commit.comment_count,
                date: commit.commit.author.date,
                sha: commit.sha
              }
            });
          } else {
            this.commits = new Array<commit>();
            const val = res.commit.message.split('\n');
            const message = val[0];
            val.shift();
            const description = val.join('\r\n');
            this.commits.push({
              author: res.author,
              message: message,
              description: description,
              verification: res.verification,
              comment_count: res.comment_count,
              date: res.committer.date,
              sha: res.sha
            });
          }
        });
    },
    fetchCommitsNext(branche?: string) {
      this.nextPage;
      this.fetchCommits(branche);
    },
    fetchCommitsPrev(branche?: string) {
      this.prevPage;
      this.fetchCommits(branche);
    },
    resetPagination() {
      return pagination = { page: 1, per_page: 25 }
    },
    nextPage() {
      // const page = pagination.page = pagination.page + 1;
      return ++pagination.page;
    },
    prevPage() {
      // const page = pagination.page = pagination.page - 1;
      return --pagination.page;
    }
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
