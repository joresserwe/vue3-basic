import { onUnmounted } from 'vue';

export const useCommonUnMount = () => {
  onUnmounted(() => {
    console.log('common unmount');
  });
};
