export const loading = {
  mounted(el: HTMLElement, binding: any) {
    const loading = document.createElement("div");
    loading.className = "zero-dirctive-loading";
    const text = document.createElement("span");
    text.innerText = "加载中...";
    loading.appendChild(text);
    const style = document.createElement("style");
    style.innerText = `
        .loading {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
        }
        .loading img {
        width: 50px;
        height: 50px;
        }
        .loading span {
        color: #fff;
        font-size: 14px;
        margin-top: 10px;
        }
    `;
    loading.appendChild(style);
    el.appendChild(loading);
    if (binding.value) {
      loading.style.display = "flex";
    } else {
      loading.style.display = "none";
    }
  },
  updated(el: HTMLElement, binding: any) {
    const loading = el.querySelector(".zero-dirctive-loading") as HTMLElement;
    if (binding.value) {
      loading.style.display = "flex";
    } else {
      loading.style.display = "none";
    }
  },
};
