

Promise.all(window.allFetches)
.finally(() => {
     setTimeout(() => {
          $cc($(".loader-container"), "open", "remove");
          $cc($("html"), "toggle", "remove");
     });
})