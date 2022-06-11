import { Module } from 'vuex';
import { RootState } from '@/store';

export interface Toast {
  id?: number,
  message: string,
  type: string
  show?: boolean
}

export interface ToastState {
  toasts: Toast[],
}

export const toast: Module<ToastState, RootState> = {
  namespaced: true,
  state: {
    toasts: [],
  },
  mutations: {
    ADD_TOAST(state, payload: Toast) {
      state.toasts.push({ ...payload, id: Date.now() });
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
  },
  actions: {
    triggerToast({ commit }, payload: ToastState) {
      commit('ADD_TOAST', { ...payload });
      setTimeout(() => { commit('REMOVE_TOAST'); }, 5000);
    },
  },
  getters: {
    toastMessagedWithSmile(state, id: number) {
      return `${state.toasts[id].message} 😱`;
    },
  },
};
