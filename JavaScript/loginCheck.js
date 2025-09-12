const reg_email = $id("rp-email");
const reg_password = $id("rp-password");
const condition_li = $(".right-side.v3 .parol-status ul li", true);
let all_true = false;
$on(reg_password, "input", () => {
     condition_li[0].classList.toggle("valid", reg_password.value.length >= 8);
     condition_li[1].classList.toggle("valid", /[A-Z]/.test(reg_password.value));
     condition_li[2].classList.toggle("valid", /[a-z]/.test(reg_password.value));
     condition_li[3].classList.toggle("valid", /[0-9]/.test(reg_password.value));
     for (let i = 0; i < condition_li.length; i++) {
          if (!condition_li[i].classList.contains("valid")) {
               all_true = false;
               break;
          }
          all_true = true;
     }
     all_true ? reg_password.classList.remove("wrong") : reg_password.classList.add("wrong");
});

class User {
     constructor(name, email, password) {
          this.name = name;
          this.email = email;
          this.password = password;
          this.pro = false;
          this.status = null;
          this.JobAd = [];
          this.cv = [];
     }

}

let Users = JSON.parse(localStorage.getItem("UsersData")) || [];

$on($id("submit-rp"), "click", function () {

     if ($id("rp-name").value.length < 5) {
          $id("warningMSG-rp").innerText = "Minimum simvol sayı 5 !";
          return;
     }
     if (!$id("rp-email").value.includes("@gmail.com")) {
          $id("warningMSG-rp").innerText = "Gmail doğru yazılmayıb!";
          return;
     }
     if (!all_true) return;
     let u = new User($id("rp-name").value, $id("rp-email").value, $id("rp-password").value);
     const exists1 = Users.some(user => $id("rp-name").value == user.name);
     const exists2 = Users.some(user => $id("rp-email").value == user.email);
     if (exists1 || exists2) {
          $id("warningMSG-rp").innerText = "Bu istifadəçi zatən mövcuddur.";
          return;
     };
     Users.push(u);
     localStorage.setItem("UsersData", JSON.stringify(Users));
     localStorage.setItem("user", JSON.stringify(u));
     window.location.replace("user.html");

})
$on($id("submit-lp"), "click", function () {
     Users = JSON.parse(localStorage.getItem("UsersData"));
     let foundUser = false;
     Users.forEach(user => {
          if ($id("lp-email").value == user.name || $id("lp-email").value == user.email) {
               foundUser = true;
               if (user.password === $id("lp-password").value) {
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.replace("user.html");
               } else {
                    $id("warningMSG-lp").innerText = "Yanlış şifrə!";
               }
          }
     });
     if (!foundUser) {
          $id("warningMSG-lp").innerText = "İstifadəçi tapılmadı!";
     }

});




