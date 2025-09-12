
$on(document, "DOMContentLoaded", () => {
     let user = JSON.parse(localStorage.getItem("user"));
     $id("p_img").src = user.pImg;
     $id("userPhotoImg").src = user.pImg;


})

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

let editBox = $(".pp-edit");
let editBtn = $(".edit-profile");

$on(editBtn, "click", function () {
     $cc(editBox, "open", "add");
     $cc(editBtn.parentElement.parentElement, "open", "remove");
})

$on($(".edit-profile"), "click", function () {
     const popup = $(".pp-edit");
     if (popup) popup.style.display = "flex";
})

function closeEditUser() {
     const popup = $(".pp-edit");
     if (popup) popup.style.display = "none";
}
$on($(".pp-edit .btn.cancel"), "click", closeEditUser);

$on($(".pp-edit"), "click", (e) => {
     if (e.target === $(".pp-edit")) {
          $(".pp-edit").style.display = "none";
     }
});


const fileEl = $id("setPhoto");

$on(fileEl, "change", () => {
     const fr = new FileReader();
     fr.readAsDataURL(fileEl.files[0]);
     $on(fr, "load", () => {
          const url = fr.result;
          let users = JSON.parse(localStorage.getItem("UsersData"));
          let currentUser = JSON.parse(localStorage.getItem("user"));
          users.forEach(user => {
               if (user.name == currentUser.name) {
                    user.pImg = url;
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("UsersData", JSON.stringify(users));
                    location.reload();
                    console.log(localStorage)
               }
          })
     })
})


