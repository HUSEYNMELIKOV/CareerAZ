

$on($("#explore"), "click", function (e) {
     $cc($("header .dropdown-content"), "open_window", "toggle");
     let element = e.target;
     element.querySelector("i").classList.toggle("isToggle")
})

$on(document, "click", function (e) {
     let element = e.target;
     const dr = $("header .dropdown-content")
     if (!element.closest(".explore_btn")) {
          if (!dr.contains(element)) {
               dr.classList.remove("open_window");
               $("#explore").querySelector("i").classList.remove("isToggle")
          }
     }
     if (!element.closest(".profile-btn")) {
          if (!$(".pp-dropdown").contains(element)) {
               $cc($(".pp-dropdown"), "open", "remove");
          }

     }
});

$on($(".profile-btn"), "click", function () {
     $cc($(".pp-dropdown"), "open", "toggle");
})

$on($(".logout-btn"), "click", function () {
     window.location.replace("index.html");
})

