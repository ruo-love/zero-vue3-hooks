export const wrapLoading = {
  mounted(el: HTMLElement, binding: any) {
    el.style.position = "relative";
    const style = document.createElement("style");
    style.id = "zero-dirctive-wrap-loading-style";
    style.innerHTML = `
        .zero-dirctive-wrap-loading::after {
        content: "loading...";
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height:100%;
        text-align: center;
        color: #fff;
        background-color: rgba(0,0,0,.5);
    }
    `;
    document.head.appendChild(style);
    if (binding.value) {
      el.classList.add("zero-dirctive-wrap-loading");
    } else {
      el.classList.remove("zero-dirctive-wrap-loading");
    }
  },
  updated(el: HTMLElement, binding: any) {
    if (binding.value) {
      el.classList.add("zero-dirctive-wrap-loading");
    } else {
      el.classList.remove("zero-dirctive-wrap-loading");
    }
  },
};
