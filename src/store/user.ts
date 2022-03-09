import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUser = defineStore('user', {
  state: () => {
    return {
      token: '',
      authId: '',
      email: '',
      username: '',
    }
  },
  getters: {
    getAuthId: (state) => {
      return state.authId ? state.authId : state.authId = localStorage.authId;
    },
    isConnected: (state) => {
      return state.authId !== '' || localStorage.hasOwnProperty("authId")
    },
  },
  actions: {
    async connect() {
      return await this.github.connect().then((data) => {
        this.authId = data.authId;
        localStorage.authId = data.authId;
        console.log('Sucessfully connected!', data);
      }).catch((error) => console.error('It failed!', error))
    },
  },
});
