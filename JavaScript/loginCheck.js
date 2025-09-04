const reg_email = $id("rp-email");
const reg_password = $id("rp-password");
const condition_li = $(".right-side.v3 .parol-status ul li",true);
let all_true = false;
$on(reg_password,"input", () => {
     condition_li[0].classList.toggle("valid", reg_password.value.length >= 8);
     condition_li[1].classList.toggle("valid", /[A-Z]/.test(reg_password.value));
     condition_li[2].classList.toggle("valid", /[a-z]/.test(reg_password.value));
     condition_li[3].classList.toggle("valid", /[0-9]/.test(reg_password.value));
     for(let i = 0; i < condition_li.length; i++){
          if(!condition_li[i].classList.contains("valid")){
               all_true = false;
               break;
          }
          all_true = true;
     }
     all_true ? reg_password.classList.remove("wrong") : reg_password.classList.add("wrong");
})
