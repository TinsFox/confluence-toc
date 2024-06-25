import type { PlasmoCSConfig } from "plasmo"

export {}

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
  world: "MAIN"
}

const style = document.createElement("style")
style.textContent = `
.custom-position {
  position: fixed;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  background-color: bisque;
  width: 268px;
  z-index: 1000;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, opacity 0.3s ease;
  max-height:80%;
  overflow: auto
}
.toggle-toc-button {
  position: fixed;
  top: 10%;
  right: 40px;
  transform: translateY(-50%);
  cursor: pointer;
  /* background: white; */
  border: none;
  width: 24px;
  height: 24px;
  z-index: 9999;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
.toggle-toc-button:hover {
  background-color: #f0f0f0;
}
`
document.head.appendChild(style)

const applyCustomPosition = () => {
  const tocElement = document.querySelector(
    ".toc-macro.client-side-toc-macro.conf-macro.output-block.hidden-outline"
  )
  const minWidth = 1024
  const existingClonedTocElement = document.querySelector(".custom-position")

  if (window.innerWidth > minWidth && tocElement && !existingClonedTocElement) {
    const clonedTocElement = tocElement.cloneNode(true) as HTMLElement
    clonedTocElement.classList.add("custom-position")
    document.body.appendChild(clonedTocElement)
    addToggleButton()
  }

  if (window.innerWidth > minWidth && existingClonedTocElement) {
    const clonedTocElement = tocElement.cloneNode(true) as HTMLElement
    existingClonedTocElement.replaceWith(clonedTocElement)
    clonedTocElement.classList.add("custom-position")
    addToggleButton()
  }

  if (window.innerWidth < minWidth && existingClonedTocElement) {
    existingClonedTocElement.classList.add("hidden")
  }
}

const addToggleButton = () => {
  let button = document.querySelector(".toggle-toc-button")
  if (!button) {
    button = document.createElement("button")
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>'
    button.className = "toggle-toc-button"
    document.body.appendChild(button)
    button.addEventListener("click", toggleToc)
  }
}

const toggleToc = () => {
  const tocElement = document.querySelector(".custom-position") as HTMLElement
  const button = document.querySelector(".toggle-toc-button")
  if (tocElement && button) {
    const isVisible = tocElement.style.display !== "none"
    console.log("isVisible: ", isVisible)
    // 切换高度、透明度和垂直偏移
    tocElement.style.opacity = isVisible ? "0" : "1"
    tocElement.style.transform = isVisible
      ? "translateY(-50%)"
      : "translateY(-50%)" // 确保始终垂直居中
    setTimeout(() => {
      tocElement.style.display = isVisible ? "none" : "block"
    }, 300) // 确保与 CSS 中的动画时间一致
    localStorage.setItem("tocVisible", isVisible ? "false" : "true")
    updateButtonIcon(isVisible ? "closed" : "open", button)
  }
}

const updateButtonIcon = (state, button) => {
  if (state === "open") {
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>'
  } else {
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>'
  }
}

const restoreTocVisibility = () => {
  const tocVisible = localStorage.getItem("tocVisible") === "true"
  const tocElement = document.querySelector(".custom-position") as HTMLElement
  const button = document.querySelector(".toggle-toc-button")
  if (tocElement && button) {
    tocElement.style.display = tocVisible ? "block" : "none"
    updateButtonIcon(tocVisible ? "open" : "closed", button)
  }
}

window.addEventListener("load", () => {
  applyCustomPosition()
  restoreTocVisibility()
})
window.addEventListener("resize", applyCustomPosition)
