
$on(document, "DOMContentLoaded", () => {
     let user = JSON.parse(localStorage.getItem("user"));
     $id("p_img").src = user.pImg;
     $id("userPhotoImg").src = user.pImg;
     $id("email_edit").value = user.email;
     $id("edit-name").value = user.name;

});
const popupOverlay = $id("popupOverlay");
function openPopup() {
     popupOverlay.style.display = "flex";
}
function closePopup() {
     popupOverlay.style.display = "none";
}
$on(popupOverlay, "click", (e) => {
     if (e.target === popupOverlay) {
          closePopup();
     }
});

const loadMsg = function (user) {
     user.notices.forEach(notice => {
          if (notice.userName !== user.name) {
               $id("messagesList").innerHTML +=
                    `
               <div class="message-item">
               <img src="${notice.userImg}" alt="Profil">
               <div class="message-content">
                 <h4 class="sender-name">${notice.userName}</h4>
                 <textarea disabled> ${notice.msg} </textarea>
                    </div>
                    <button class="removeMSG" onclick="removeMSG(this)" >Sil</button>
               </div>
           `
          }
     })
}
const removeMSG = function (e) {
     let removedElement = e.parentElement;
     let userName = removedElement.querySelector(".sender-name").textContent;
     let users = JSON.parse(localStorage.getItem("UsersData"));

     users.forEach(user => {
          user.notices.forEach((notice, index) => {
               if (notice.userName == userName) {
                    user.notices.splice(index, 1);
               }
          })
          localStorage.setItem("user", JSON.stringify(user));
     });
     removedElement.remove();
     localStorage.setItem("UsersData", JSON.stringify(users));

}
loadMsg(JSON.parse(localStorage.getItem("user")));

$on($id("save-edit"), "click", function () {
     let currentUserName = JSON.parse(localStorage.getItem("user"));
     let users = JSON.parse(localStorage.getItem("UsersData"));
     let beforeName = currentUserName.name;
     let newName = null;
     if ($id("edit-name").value.length < 5) {
          $id("wrongMsgUser").innerText = "Minimum simvol sayı 5 olmalıdır.";
          return;
     }
     let checkUserName = false;
     users.forEach(user => {
          if (user.name == $id("edit-name").value) {
               $id("wrongMsgUser").innerText = "Bu istifadəçi adı artıq təyin olunub.";
               checkUserName = true;
          }
     })
     if (!checkUserName) {
          users.forEach(user => {

               if (user.name == currentUserName.name) {
                    user.name = $id("edit-name").value;
                    newName = $id("edit-name").value;
                    localStorage.setItem("user", JSON.stringify(user));

               }
               user.notices.forEach(obj => {
                    if (obj.userName == beforeName) {
                         obj.userName = $id("edit-name").value;
                         localStorage.setItem("user", JSON.stringify(user));

                    }
               });
               if (user.name == newName) {
                    user.JobAd.forEach(obj => {
                         obj.userName = user.name;
                         localStorage.setItem("user", JSON.stringify(user));

                    })
               }
               if (user.name == newName) {
                    user.cv.forEach(obj => {
                         obj.userName = user.name;
                         localStorage.setItem("user", JSON.stringify(user));

                    })
               }
          });
          localStorage.setItem("UsersData", JSON.stringify(users));
          location.reload();
     }

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
               user.notices.forEach(notice => {
                    if (notice.userName == currentUser.name) {
                         notice.userImg = url;
                    }
               })
               if (user.name == currentUser.name) {
                    user.pImg = url;

                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("UsersData", JSON.stringify(users));

                    location.reload();
               }
          })
     })
});





