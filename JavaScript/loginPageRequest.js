
const state = { login: null, register: null, current: null, chackBeforeClick: false };
const LP = $(".loginPage-overlay .loginPage");
const LPoverlay = $(".loginPage-overlay");
const p_inWithXpage = $(".loginPage .right-side .with-x-page .with p", true);
const h2_inRightHeader = $(".loginPage .right-side .right-header h2");
const p_inRightHeader = $(".loginPage .right-side .right-header p");
const closePage = $(".loginPage .close-btn", true);
const backPage = $(".loginPage .closeLogin", true);
const rightSide_v1 = $(".loginPage .v1");
const rightSide_v2 = $(".loginPage .v2");
const rightSide_v3 = $(".loginPage .v3");

const getData = async () => {
     try {
          let response = await fetch("/Data/loginPageContext.json");
          let data = await response.json();
          state.login = await data[0].text;
          state.register = await data[1].text;
     } catch (err) {
          console.error(err);
     }
};

$on(document, "DOMContentLoaded", getData);



$(".loginBtn", true).forEach(btn => {
     $on(btn, "click", async function () {
          if (!state.chackBeforeClick) await getData();
          loadPageText("login");
          state.current = "login";
          openLPoverlay();
     })
})

$(".registerBtn", true).forEach(btn => {
     $on(btn, "click", async function () {
          if (!state.chackBeforeClick) await getData();
          loadPageText("register");
          state.current = "register";
          openLPoverlay();
     })
})
closePage.forEach(button => {
     $on(button, "click", () => closeLoginPage());
});

const openLPoverlay = () => {
     $cc(LPoverlay, "open", "add");
     $cc(LP, "open", "add");
     $cc(document.documentElement, "toggle", "add");
     $cc(rightSide_v1, "open", "add");
     $cc(rightSide_v2, "open", "remove");
     $cc(rightSide_v3, "open", "remove");

     $on(LPoverlay, "click", (e) => {
          if (e.target === LPoverlay) closeLoginPage();
     });
};

const closeLoginPage = () => {
     $cc(LPoverlay, "open", "remove");
     $cc(LP, "open", "remove");
     $cc(document.documentElement, "toggle", "remove");
};

const loadPageText = (CurrentPage) => {
     h2_inRightHeader.innerText = state[CurrentPage].h2;
     p_inWithXpage[1].innerText = state[CurrentPage].withButtonEmail;
     p_inRightHeader.innerHTML = state[CurrentPage].p + ` <span onclick="changePage()">${state[CurrentPage].span}</span>`;
};

const changePage = () => {
     state.current === "login"
          ? (loadPageText("register"), state.current = "register")
          : (loadPageText("login"), state.current = "login");
};

const changeType = (button) => {
     let passwordInput = $id("lp-password");
     let i = button.querySelector("i");
     $cc(i, "fa-eye-slash", "toggle");
     $cc(i, "fa-eye", "toggle");
     $cc(i, "fa-eye", "contains") ? passwordInput.type = "text" : passwordInput.type = "password";
};

const changeTypeReg = (button) => {
     let passwordInput = $id("rp-password");
     let i = button.querySelector("i");
     $cc(i, "fa-eye-slash", "toggle");
     $cc(i, "fa-eye", "toggle");
     $cc(i, "fa-eye", "contains") ? passwordInput.type = "text" : passwordInput.type = "password";
};

const loadLoginPage = () => {
     $cc(rightSide_v1, "open", "remove");
     $cc(rightSide_v2, "open", "add");
     $on(backPage[0], "click", () => {
          $cc(rightSide_v1, "open", "add");
          $cc(rightSide_v2, "open", "remove");
     });
};

const loadRegisterPage = () => {
     $cc(rightSide_v1, "open", "remove");
     $cc(rightSide_v3, "open", "add");
     $on(backPage[1], "click", () => {
          $cc(rightSide_v1, "open", "add");
          $cc(rightSide_v3, "open", "remove");
     });
};

$on(p_inWithXpage[1].parentElement, "click", () => {
     state.current === "login" ? loadLoginPage() : null;
     state.current === "register" ? loadRegisterPage() : null;
});
window.allFetches = window.allFetches ? window.allFetches : [];
window.allFetches.push(getData()); 