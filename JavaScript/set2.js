const getCategoriesName1 = async () => {
     try {
          let response = await fetch("/Data/jobs.json");
          let data = await response.json();
          setSelectcv(data[0].jobsCategories.categories)
     } catch (err) {
          console.error(err);
     }
};
$on(document, "DOMContentLoaded", getCategoriesName1);
class cv {
     constructor(categories, job, description, salary, date, userName, phoneNumber) {
          this.categories = categories;
          this.job = job;
          this.description = description;
          this.salary = salary;
          this.date = date;
          this.userName = userName;
          this.phoneNumber = phoneNumber;
          this.id = Date.now();
     }
}
let formDataCV = {
     categories: null,
     job: null,
}
const setSelectcv = (data) => {
     data.forEach(obj => {
          $id("select-categories-cv").innerHTML +=
               `
               <option value="${obj.id}">${obj.name}</option>
          `;
     });
     $on($id("select-categories-cv"), "change", function () {
          let options = $id("select-categories-cv").querySelectorAll("option");
          options.forEach(option => {
               option.value == "none" ? option.remove() : null;
          });
          data.forEach(obj => {
               obj.id == $id("select-categories-cv").value ? formDataCV.categories = obj.name : null;
          })
     })
     $id("select-categories-cv").addEventListener("change", function () {

          data.forEach(obj => {
               if (obj.id == this.value) {
                    let o = $id("select-jobs-cv").querySelectorAll("option");
                    o.forEach(option => {
                         option.value !== "none" ? option.remove() : null;
                    })
                    obj.jobs.forEach(job => {
                         $id("select-jobs-cv").innerHTML +=
                              `
                              <option value="${job.name}">${job.name}</option>
                         `
                    })
               }
          })
          $on($id("select-jobs-cv"), "change", function () {
               let options = $id("select-jobs-cv").querySelectorAll("option");
               options.forEach(option => {
                    option.value == "none" ? option.remove() : null;
                    option.value == $id("select-jobs-cv").value ? formDataCV.job = option.textContent : null;
               });

          })
     });
};

let select1CV = $id("select-categories-cv");
let select2CV = $id("select-jobs-cv");
let textareaCV = $id("description-el-cv");
let salaryCV = $id("salary-cv");
let phoneCV = $id("phone-el-cv")
let doneCV = $id("set_cv");

$on(phoneCV, "input", function () {
     let digits = this.value.replace(/\D/g, "");
     digits = digits.substring(0, 12);
     let formatted = "";
     if (digits.length > 0) formatted = digits.substring(0, 3);
     if (digits.length > 3) formatted += " " + digits.substring(3, 6);
     if (digits.length > 6) formatted += " " + digits.substring(6, 8);
     if (digits.length > 8) formatted += " " + digits.substring(8, 10);
     this.value = formatted;
})

const wrongMSGCV = () => {
     let p = $id("wrongFa-cv").querySelector("p");
     p.innerText = "Zəhmət olmasa formu doldurun";
}

$on(doneCV, "click", function () {
     if (formDataCV.categories == null) {
          $cc(select1CV, "wrong","add");
          wrongMSGCV();
          return;
     }
     if (formDataCV.job == null) {
          $cc(select2CV, "wrong","add");
          wrongMSGCV();

          return;
     }
     if (textareaCV.value == "") {
          $cc(textareaCV,"wrong","add");
          wrongMSGCV();
          return;
     }
     if (salaryCV.value == "") {
          
          $cc(salaryCV, "wrong","add");
          wrongMSGCV();

          return;
     }
     if (phoneCV.value.length !== 13) {
          wrongMSGCV();

          return;
     }
     const now = new Date().toISOString(); 
     let currentUserName = JSON.parse(localStorage.getItem("user")).name;
     let setLoacal = new cv(formDataCV.categories, formDataCV.job, textareaCV.value, salaryCV.value ,now,currentUserName,phoneCV.value);
     console.log(setLoacal)
     let users = JSON.parse(localStorage.getItem("UsersData"));
     let currentuserName = JSON.parse(localStorage.getItem("user")).name;
     users.forEach(user => {
          if(user.name == currentuserName){
               user.cv.push(setLoacal);
          }
     });
     localStorage.setItem("UsersData", JSON.stringify(users));
     window.location.replace("user.html");
})