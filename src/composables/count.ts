import {
  reactive, toRefs, watch,
} from 'vue';

export const useCount = () => {
  const state = reactive({
    count: 0,
  });

  watch(state, () => {
    console.log('##########');
  });

  return toRefs(state);
};
