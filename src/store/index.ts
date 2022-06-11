import { InjectionKey } from 'vue';
import { createStore, Store, useStore as originalUseStore } from 'vuex';
import modules from './modules';
import { ToastState } from './modules/toast';

export interface RootState {
  toast: ToastState
}

export const key: InjectionKey<Store<RootState>> = Symbol('vuex');

export const useStore = () => originalUseStore(key);

export default createStore({
  modules,
});
