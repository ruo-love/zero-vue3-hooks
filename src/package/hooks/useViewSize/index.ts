import { IConfig } from "@/package/types/useView";
import { ComputedRef, computed, onBeforeUnmount, reactive } from "vue";

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
): [ComputedRef<string>, { width: number; height: number }] {
  const size = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const sizeType = computed<string>(() => {
    const entris = Object.entries(config).sort((a, b) => a[1] - b[1]);
    const keys: Array<string> = entris.map((item) => item[0]);
    const values = entris.map((item) => item[1]);
    let index = values.findIndex((item) => item >= size.width);
    if (index === -1) {
      index = values.length - 1;
    }
    return keys[index];
  });

  const handleResize = () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
  };
  window.addEventListener("resize", handleResize);
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
  return [sizeType, size];
}
