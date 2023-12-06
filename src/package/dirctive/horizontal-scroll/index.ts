export const horizontalScroll = {
  mounted(el: HTMLElement) {
    el.addEventListener(
      "wheel",
      function (event) {
        event.preventDefault();
        el.scrollLeft += event.deltaY;
      },
      { passive: false }
    );
  },
  beforeUnmount(el: HTMLElement) {
    el.removeEventListener("wheel", function (event: any) {
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    });
  },
};
