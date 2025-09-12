



const headerOpenBurgerBtnUS = $id("burgerBtn");

$on(headerOpenBurgerBtnUS, "click", function () {
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

$on(document,"DOMContentLoaded", function() {
     let currentUserName = JSON.parse(localStorage.getItem("user")).name;
     $("#sidebar .pp").innerHTML = `<h1>${currentUserName}</h1>`;
})