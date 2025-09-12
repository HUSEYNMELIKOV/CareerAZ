let lastJobsInSection = $id("last-adv");
let allAdv = new Array();
let users = JSON.parse(localStorage.getItem("UsersData"));

/* istifadecilerin paylasdigi is elanlarinin bir arraya toplanmasi ucun */
users.forEach(user => {
     if (user.JobAd.length !== 0) {
          user.JobAd.forEach(adv => {
               allAdv.push(adv);
          })
     }
});

// sonuncu yuklenen elanlari arrayin evveline atiriq

allAdv.sort((a, b) => new Date(b.date) - new Date(a.date));

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
     /* if (allAdv.length < 4) break; */
     const formattedDate = formatAzDate(allAdv[i].date);
     lastJobsInSection.innerHTML += `
     <a href="#">
     <div class="card">
          <div class="poster">
               <h3>Paylaşan: ${allAdv[i].userName}</h3>
               <img src="/assets/images/userDefault.png" width="40px">
               
          </div>
          <div class="header">
               <h1>${allAdv[i].job}</h1>
          </div>
               <div class="description">
               <p>${allAdv[i].description}</p>
          </div>
          <div class="salary date">
               <p>${allAdv[i].salary1} - ${allAdv[i].salary2} AZN</p>
               <span>${formattedDate}</span>
          </div>
          
     </div>
     </a>
     `
}

