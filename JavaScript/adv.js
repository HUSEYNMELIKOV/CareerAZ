let users = JSON.parse(localStorage.getItem("UsersData"));
let currentUser = JSON.parse(localStorage.getItem("user"));
let advID = JSON.parse(localStorage.getItem("advID"));
let user = null;
let allAdvList = new Array();
users.forEach(user => {
     user.JobAd.forEach(Object => {
          allAdvList.push(Object);
     })
     user.cv.forEach(Object => {
          allAdvList.push(Object);
     })
});
let txt = $id("posterName")
let txt1 = $id("jobCategory");
let txt2 = $id("jobTitle");
let txt3 = $id("jobDescription");
let txt4 = $id("jobSalary");
let txt5 = $id("contact");


allAdvList.forEach(adv => {
     if(advID == adv.id){
          txt.innerText = adv.userName;
          txt1.value = adv.categories;
          txt2.value = adv.job;
          txt3.value = adv.description;
          txt4.innerText = adv.salary ? adv.salary + "AZN" : adv.salary1 + " - " + adv.salary2;
          txt5.value = "Telefon: " + adv.phoneNumber;

          user = adv.userName;
     }

});
class sender {
     constructor (userName,userImg,msg){
          this.userName = userName;
          this.userImg = userImg;
          this.msg = msg;
     }
}
users.forEach(us => {
     if(us.name == user){
          $id("posterImg").src = us.pImg;
          txt5.value += ", Gmail: " + us.email;
     }
})
let msgInp = $id("msgInput");
$on($id("sendMsgBtn"), "click", function () {
     if(msgInp.value.length == 0) return;
     let send = new sender(currentUser.name,currentUser.pImg,msgInp.value);
     
     users.forEach(us => {
          if(us.name == user){
               us.notices.push(send);
               localStorage.setItem("UsersData", JSON.stringify(users));
          }
          
     });
     msgInp.value = "";

     window.location.replace("user.html") 
})