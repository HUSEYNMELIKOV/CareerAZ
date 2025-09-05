window.$ = (selector, all = false) => all ? document.querySelectorAll(selector) 
: document.querySelector(selector);
window.$id = (id) => document.getElementById(id);
window.$cc = (el, className, action) => {
     if (action === "add") {
          el.classList.add(className);
     } else if (action === "remove") {
          el.classList.remove(className);
     } else if (action === "toggle") {
          el.classList.toggle(className);
     } else if (action === "contains"){
          return el.classList.contains(className);
     }
      else {
          return null;
     }
}
window.$on = function (el, event, handler) {
     if (el && event && handler) {
          el.addEventListener(event, handler);
     }
};