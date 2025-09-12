
const getCategoriesName = async () => {
     try {
          let response = await fetch("/Data/jobs.json");
          let data = await response.json();
          setSelect(data[0].jobsCategories.categories)
     } catch (err) {
          console.error(err);
     }
};
$on(document, "DOMContentLoaded", getCategoriesName);
class jobAd {
     constructor(categories, job, description, salary1, salary2, date, userName) {
          this.categories = categories;
          this.job = job;
          this.description = description;
          this.salary1 = salary1;
          this.salary2 = salary2;
          this.date = date;
          this.userName = userName;
     }
}
let formData = {
     categories: null,
     job: null,
}
const setSelect = (data) => {
     data.forEach(obj => {
          $id("select-categories").innerHTML +=
               `
               <option value="${obj.id}">${obj.name}</option>
          `;
     });
     $on($id("select-categories"), "change", function () {
          let options = $id("select-categories").querySelectorAll("option");
          options.forEach(option => {
               option.value == "none" ? option.remove() : null;
          });
          data.forEach(obj => {
               obj.id == $id("select-categories").value ? formData.categories = obj.name : null;
          })
     })
     $id("select-categories").addEventListener("change", function () {

          data.forEach(obj => {
               if (obj.id == this.value) {
                    let o = $id("select-jobs").querySelectorAll("option");
                    o.forEach(option => {
                         option.value !== "none" ? option.remove() : null;
                    })
                    obj.jobs.forEach(job => {
                         $id("select-jobs").innerHTML +=
                              `
                              <option value="${job.name}">${job.name}</option>
                         `
                    })
               }
          })
          $on($id("select-jobs"), "change", function () {
               let options = $id("select-jobs").querySelectorAll("option");
               options.forEach(option => {
                    option.value == "none" ? option.remove() : null;
                    option.value == $id("select-jobs").value ? formData.job = option.textContent : null;
               });

          })
     });
};

let select1 = $id("select-categories");
let select2 = $id("select-jobs");
let textarea = $id("description-el");
let salaryMin = $id("salary-elmin");
let salaryMax = $id("salary-elmax");
let phone = $id("phone-el")
let done = $id("set_jAdd");

$on(phone, "input", function () {
     let digits = this.value.replace(/\D/g, "");
     digits = digits.substring(0, 12);
     let formatted = "";
     if (digits.length > 0) formatted = digits.substring(0, 3);
     if (digits.length > 3) formatted += " " + digits.substring(3, 6);
     if (digits.length > 6) formatted += " " + digits.substring(6, 8);
     if (digits.length > 8) formatted += " " + digits.substring(8, 10);
     this.value = formatted;
})

const wrongMSG = () => {
     let p = $id("wrongFa").querySelector("p");
     p.innerText = "Zəhmət olmasa formu doldurun";
}

$on(done, "click", function () {
     if (formData.categories == null) {
          $cc(select1, "wrong","add");
          wrongMSG();
          return;
     }
     if (formData.job == null) {
          $cc(select2, "wrong","add");
          wrongMSG();

          return;
     }
     if (textarea.value == "") {
          $cc(textarea, "wrong","add");
          wrongMSG();

          return;
     }
     if (salaryMax.value == "" || salaryMin.value == "") {
          if(salaryMax <= salaryMin) return;
          $cc(salaryMax, "wrong","add");
          $cc(salaryMin, "wrong","add");
          wrongMSG();

          return;
     }
     if (phone.value.length !== 13) {
          $cc(phone, "wrong","add");
          wrongMSG();

          return;
     }
     const now = new Date().toISOString(); 
     let currentUserName = JSON.parse(localStorage.getItem("user")).name;
     let setLoacal = new jobAd(formData.categories, formData.job, textarea.value, salaryMin.value, salaryMax.value,now,currentUserName);
     console.log(setLoacal);
     let users = JSON.parse(localStorage.getItem("UsersData"));
     let currentuserName = JSON.parse(localStorage.getItem("user")).name;
     users.forEach(user => {
          if(user.name == currentuserName){
               user.JobAd.push(setLoacal);
          }
     });
     localStorage.setItem("UsersData", JSON.stringify(users));
     window.location.replace("user.html");
})