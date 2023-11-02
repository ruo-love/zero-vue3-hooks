import { Ref, ref } from "vue";

// 帮我写文档注释
/**
 * @description: 用于在两个值之间切换
 * @param {T} values 两个值 [值1,值2]
 * @return {[Ref<T>,(value?: T) => void]} active 当前值 toggle 切换函数
 * @example:
 * const [active,toggle] = useToggle([1,2])
 * toggle() // active.value = 2 //first
 * toggle() // active.value = 1 //second
 * toggle(2) // active.value = 2
 * toggle(1) // active.value = 1
 */
export  function useToggle<T>(
  values: [T, T]
): [Ref<T>, (value?: T) => void] {
  const active = ref<T>(values[0]) as Ref<T>;
  const toggle = (v?: T) => {
    if (v != undefined) return (active.value = v);
    if (active.value === values[0]) {
      active.value = values[1];
    } else {
      active.value = values[0];
    }
  };
  return [active, toggle];
}
