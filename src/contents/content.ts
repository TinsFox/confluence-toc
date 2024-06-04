import type { PlasmoCSConfig } from "plasmo"
export { }

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
  world: "MAIN"
}

const style = document.createElement('style');
style.textContent = `
.custom-position {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
`;

document.head.appendChild(style);

const applyCustomPosition = () => {
  const tocElement = document.querySelector('.toc-macro.client-side-toc-macro.conf-macro.output-block.hidden-outline');
  const minWidth = 1024; // 定义最小宽度，例如1024px
  const existingClonedTocElement = document.querySelector('.custom-position');
  if (window.innerWidth > minWidth && tocElement && !existingClonedTocElement) {
    const clonedTocElement = tocElement.cloneNode(true) as HTMLElement;
    clonedTocElement.classList.add("custom-position");
    document.body.appendChild(clonedTocElement);
  }
  if (window.innerWidth > minWidth  && existingClonedTocElement) {
    const clonedTocElement = tocElement.cloneNode(true) as HTMLElement;
    if(existingClonedTocElement.classList.length>0){
      existingClonedTocElement.classList?.remove("hidden");
    }
    clonedTocElement.classList.add("custom-position");
  }
  if(window.innerWidth < minWidth) {
    if (existingClonedTocElement) {
      existingClonedTocElement.classList.add("hidden");
    }
  }
};

window.addEventListener("load", applyCustomPosition);
window.addEventListener("resize", applyCustomPosition);