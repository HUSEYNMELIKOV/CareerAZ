let options = [
     { lang: "en", status: true },
     { lang: "az", status: false }
];

localStorage.getItem("langOption") ? options = JSON.parse(localStorage.getItem("langOption")) 
     : localStorage.setItem("langOption", JSON.stringify(options)); 
const getLangData = async () => {
     try {
          let response = await fetch("/Data/lang.json");
          let data = await response.json();
          options.forEach(obj => {
               if (obj.status) switchLang(data[obj.lang]);
          });
     } catch (error) {
          console.error(error);
     } finally {
          setTimeout(() => $cc($(".loader-container"), "open", "remove"), 1000);
     }
};

$on(document, "DOMContentLoaded", getLangData);
const switchLang = (lang) => {
     $("header #search_input").placeholder = lang.header.searchInput;
     $("header #pro").innerHTML = lang.header.dropdownPro.dropText + ` <i class="fa-solid fa-chevron-down"></i>`;
     $("header #pro-dropdown .dropdown-content .window-p").innerText = lang.header.dropdownPro.dropHeader;

     $("header #pro-dropdown .dropdown-content h3", true).forEach((h3, index) => {
          h3.innerText = lang.header.dropdownPro.links[index].li.h3;
     });

     $("header #pro-dropdown .dropdown-content a p", true).forEach((p, index) => {
          p.innerText = lang.header.dropdownPro.links[index].li.p;
     });

     $("header #explore-dropdown #explore").innerHTML = lang.header.dropdownExplore.dropText + ` <i class="fa-solid fa-chevron-down"></i>`;

     $("header #explore-dropdown .dropdown-content h3", true).forEach((h3, index) => {
          h3.innerText = lang.header.dropdownExplore.links[index].li.h3;
     });

     $("header #explore-dropdown .dropdown-content a p", true).forEach((p, index) => {
          p.innerText = lang.header.dropdownExplore.links[index].li.p;
     });

     $("header .seller a").innerText = lang.header.become_a_seller;
     $("header .loginBtn").innerText = lang.header.signIn;
     $("header .registerBtn").innerText = lang.header.join;
};
const switchLang_overlay = $(".switchLang-overlay");
const closeOverlay = $(".switchLang-overlay button.close");
const openWitchLangBtn = $("header .top-container nav #change_lang button");
const tabButtons = $(".switchLang-overlay .st", true);
const tabOptions = $(".switchLang-overlay .screen .option-lang", true);
const sideBarChange_lang = $(".sidebar .change_lang");
const sideBarOptions = sideBarChange_lang.parentElement.querySelectorAll(".wrapper-collapse .lang-selections");
$on(openWitchLangBtn, "click", () => $cc(switchLang_overlay, "open", "add"));
options.forEach(obj => {
     if (obj.status) {
          openWitchLangBtn.innerHTML = obj.lang.toUpperCase() + ` <i class="fa-solid fa-globe"></i>`;
          sideBarChange_lang.querySelector("span").innerHTML = obj.lang.toUpperCase() + ` <i class="fa-solid fa-globe"></i>`;
          tabOptions.forEach(btn => btn.value == obj.lang ? $cc(btn, "selected", "add") : null);
          sideBarOptions.forEach(btn => btn.value == obj.lang ? $cc(btn, "selected", "add") : null);
     }
});
tabOptions.forEach(btn => {
     $on(btn, "click", () => {
          if ($cc(btn, "selected", "contains")) return;
          tabOptions.forEach(allbtn => $cc(allbtn, "selected", "remove"));
          $cc(btn, "selected", "add");

          options = JSON.parse(localStorage.getItem("langOption"));
          options.forEach(obj => {
               if (btn.value === obj.lang && !obj.status) {
                    options.forEach(allobj => allobj.status = false);
                    obj.status = true;
               }
          });
          localStorage.setItem("langOption", JSON.stringify(options));

          options.forEach(obj => {
               if (obj.status) {
                    openWitchLangBtn.innerHTML = obj.lang.toUpperCase() + ` <i class="fa-solid fa-globe"></i>`;
                    sideBarChange_lang.querySelector("span").innerHTML = obj.lang.toUpperCase() + ` <i class="fa-solid fa-globe"></i>`;
                    sideBarOptions.forEach(btn => {
                         $cc(btn, "selected", "remove");
                         if (btn.value === obj.lang) $cc(btn, "selected", "add");
                    });
               }
          });

          $cc($(".loader-container"), "open", "add");
          getLangData();
     });
});

sideBarOptions.forEach(btn => {
     $on(btn, "click", () => {
          if ($cc(btn, "selected", "contains")) return;
          sideBarOptions.forEach(allbtn => $cc(allbtn, "selected", "remove"));
          $cc(btn, "selected", "add");

          options = JSON.parse(localStorage.getItem("langOption"));
          options.forEach(obj => {
               if (btn.value === obj.lang && !obj.status) {
                    options.forEach(allobj => allobj.status = false);
                    obj.status = true;
               }
          });
          localStorage.setItem("langOption", JSON.stringify(options));

          options.forEach(obj => {
               if (obj.status) {
                    openWitchLangBtn.innerHTML = obj.lang.toUpperCase() + ` <i class="fa-solid fa-globe"></i>`;
                    sideBarChange_lang.querySelector("span").innerHTML = obj.lang.toUpperCase() + ` <i class="fa-solid fa-globe"></i>`;
               }
          });

          $cc($(".loader-container"), "open", "add");
          getLangData();
     });
});
tabButtons.forEach(button => {
     $on(button, "click", () => {
          tabButtons.forEach(allbtn => $cc(allbtn, "active", "remove"));
          $cc(button, "active", "add");

          if ($cc(button, "lang", "contains")) {
               $cc($(".switchLang-overlay .screen .overflow .list-lang"), "open", "add");
               $cc($(".switchLang-overlay .screen .overflow .list-currency"), "open", "remove");
          }

          if ($cc(button, "currency", "contains")) {
               $cc($(".switchLang-overlay .screen .overflow .list-currency"), "open", "add");
               $cc($(".switchLang-overlay .screen .overflow .list-lang"), "open", "remove");
          }
     });
});

const closeLangOverlay = (e) => {
     if (e.target === switchLang_overlay || e.target.closest("button.close")) {
          $cc(switchLang_overlay, "open", "remove");
     }
};

$on(closeOverlay, "click", closeLangOverlay);
$on(switchLang_overlay, "click", closeLangOverlay);
