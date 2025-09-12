let lastJobsInSection = $id("last-adv");
let lastCVInSection = $id("last-cv");

let allAdv = new Array();
let allCV = new Array();
let users = JSON.parse(localStorage.getItem("UsersData"));

/* istifadecilerin paylasdigi is elanlarinin bir arraya toplanmasi ucun */
users.forEach(user => {
     if (user.JobAd.length !== 0) {
          user.JobAd.forEach(adv => {
               allAdv.push(adv);
          })
     }
});
users.forEach(user => {
     if (user.cv.length !== 0) {
          user.cv.forEach(c => {
               allCV.push(c);
          });
     }
});
// sonuncu yuklenen elanlari arrayin evveline atiriq

allAdv.sort((a, b) => new Date(b.date) - new Date(a.date));
allCV.sort((a, b) => new Date(b.date) - new Date(a.date));

// date formatinda Azərbaycan dilində
const monthsAz = [
     "yanvar", "fevral", "mart", "aprel", "may", "iyun",
     "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"
];

function formatAzDate(dateStr) {
     const d = new Date(dateStr);
     const day = d.getDate();
     const month = monthsAz[d.getMonth()];
     const year = d.getFullYear();

     return `${day} ${month} ${year}`;
}

for (let i = 0; i < 4; i++) {
     if (allAdv.length < 4) break;
     const formattedDate1 = formatAzDate(allAdv[i].date);
     const users = JSON.parse(localStorage.getItem("UsersData"));
     let userProfile = null;
     users.forEach(user => {
          if(user.name == allAdv[i].userName){
               userProfile = user.pImg;
          }
     })
     lastJobsInSection.innerHTML += `
     <a href="#" data-id="${allAdv[i].id}">
     <div class="card">
          <div class="poster">
               <h3>${allAdv[i].userName}</h3>
               <img src="${userProfile}" width="40px" >
          </div>
          <div class="header">
               <h1>${allAdv[i].job}</h1>
          </div>
               
          <div class="salary date">
               <p>${allAdv[i].salary1} - ${allAdv[i].salary2} AZN</p>
               <span>${formattedDate1}</span>
          </div>
          
     </div>
     </a>
   `
}

for (let i = 0; i < 3; i++) {
     if (allCV.length < 3) break;
     const formattedDate2 = formatAzDate(allCV[i].date);
     const users = JSON.parse(localStorage.getItem("UsersData"));
     let userProfile = null;
     users.forEach(user => {
          if(user.name == allCV[i].userName){
               userProfile = user.pImg;
          }
     })
     lastCVInSection.innerHTML += `
     <a href="#" data-id="${allCV[i].id}">
     <div class="card-cv">
     <div class="profile">
          <img src="${userProfile}" width="90px">
     </div>
     <div class="content">
          <div class="name">
               <h1>${allCV[i].userName}</h1>
          </div>
          <div class="description">
               <p>${allCV[i].description}</p>
          </div>
          <div class="salary-date">
               <span>${allCV[i].salary} AZN</span>
               <span>${formattedDate2}</span>
          </div>
     </div>
</div>
     </a>
     `;


}



/* edit profile btn */


