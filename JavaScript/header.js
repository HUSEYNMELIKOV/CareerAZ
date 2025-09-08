const darkDiv = $id("darkEffect");
const searchInput = $id("search_input");
const searchClearBtn = $id("clear_input_value");
const headerOpenDropDown = $(".hovGray", true);
const headerDropDownContent = $("header .dropdown-content", true);
const headerOpenBurgerBtn = $id("burgerBtn");
const sidebar = $id("sidebar");
$on(searchClearBtn, "click", function () {
     searchInput.focus();
})
$on(searchInput, "input", function () {
     if (this.value.length > 0) {
          $cc(searchClearBtn, "visible", "add")
          $on(searchClearBtn,"click", function () {
               searchInput.value = "";
               $cc(searchClearBtn, "visible", "remove");
          })
     } else {
          $cc(searchClearBtn, "visible", "remove");
     }
});
$on(document, "click", function (e) {
     let element = e.target;
     const dr1 = $("header .dropdown-content", true)[0]
     const dr2 = $("header .dropdown-content", true)[1]
     if (!element.closest(".pro_btn")) {
          if (!dr1.contains(element)) {
               $cc(dr1, "open_window", "remove");
               $cc(headerOpenDropDown[0].querySelector("i"), "isToggle", "remove");
          }
     }
     if (!element.closest(".explore_btn")) {
          if (!dr2.contains(element)) {
               dr2.classList.remove("open_window");
               $cc(headerOpenDropDown[1].querySelector("i"), "isToggle", "remove");
          }
     }
});
$on(headerOpenDropDown[0], "click", function () {
     $cc(headerDropDownContent[1], "open_window", "remove");
     $cc(headerDropDownContent[0], "open_window", "toggle");
     $cc(headerOpenDropDown[0].querySelector("i"), "isToggle", "toggle");
     
})
$on(headerOpenDropDown[1], "click", function () {
     $cc(headerDropDownContent[0], "open_window", "remove");
     $cc(headerDropDownContent[1], "open_window", "toggle");
     $cc(headerOpenDropDown[1].querySelector("i"), "isToggle", "toggle");

})
$on(headerOpenBurgerBtn, "click", function () {
     const sidebarOverlay = $(".sidebar-overlay");
     const sidebarContainer = $(".sidebar");
     $cc(sidebarContainer, "open", "add");
     $cc(sidebarOverlay, "open", "add");
     $("html").classList.add("toggle");
     $on(sidebarOverlay,"click", function (e) {
          if (e.target !== sidebarOverlay) return;
          $cc(sidebarContainer, "open", "remove");
          $cc(sidebarOverlay, "open", "remove");
          $("html").classList.remove("toggle");
     });
})
$on(sidebar,"click", function (e) {
     let element = e.target.closest(".wrapper");
     if (element) {
          let collapseWrapper = element.parentElement.querySelector(".wrapper-collapse");
          $cc(collapseWrapper, "open", "toggle");
          $cc(collapseWrapper.parentElement.querySelector(".fa-angle-down"), "isToggle", "toggle");
     }
})