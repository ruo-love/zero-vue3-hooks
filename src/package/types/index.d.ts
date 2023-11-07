import { Ref } from "vue";
import {
  Rules,
  IValidResult,
  triggerValidProp,
  triggerValidAll,
} from "./useValid";
import { IConfig } from "./useView";
declare module "@zrcode/v3hooks" {
  export function useToggle<T>(values: [T, T]): [Ref<T>, (value?: T) => void];
  export function useValid(
    rules: Rules
  ): [IValidResult, triggerValidProp, triggerValidAll];
  export function useViewSize(
    config: IConfig = {
      xm: 520,
      sm: 640,
      md: 768,
      mxd: 821,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    }
  ): [ComputedRef<string>, { width: number; height: number }];
}
