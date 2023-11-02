import { Ref } from "vue";
import {
  Rules,
  IValidResult,
  triggerValidProp,
  triggerValidAll,
} from "./useValid";
declare module "@zrcode/v3hooks" {
  export function useToggle<T>(values: [T, T]): [Ref<T>, (value?: T) => void];
  export function useValid(
    rules: Rules
  ): [IValidResult, triggerValidProp, triggerValidAll];
}
