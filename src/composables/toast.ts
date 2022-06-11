import { computed } from '@vue/reactivity';
import { useStore } from '@/store';

export const useToast = () => {
  const store = useStore();
  const toasts = computed(() => store.state.toast.toasts);

  const triggerToast = (message: string, type = 'success') => {
    store.dispatch('toast/triggerToast', { message, type });
  };

  return {
    toasts, triggerToast,
  };
};
