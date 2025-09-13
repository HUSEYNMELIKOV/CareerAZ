let advType = $id("type");
let filterCV = $id("filtrCV");
let card = $(".container .cards");
let moreW = $id("wMore");
let users = JSON.parse(localStorage.getItem("UsersData"));
let allCV = [];
let currentIndex = 0;
const step = 8;

const monthsAz = [
     "yanvar", "fevral", "mart", "aprel", "may", "iyun",
     "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"
];

function formatAzDate(dateStr) {
     const d = new Date(dateStr);
     return `${d.getDate()} ${monthsAz[d.getMonth()]} ${d.getFullYear()}`;
}

const getCategoriesName = async () => {
     try {
          let response = await fetch("/Data/jobs.json");
          let data = await response.json();
          setCategories(data[0].jobsCategories.categories);
     } catch (err) {
          console.error(err);
     }
};
$on(document, "DOMContentLoaded", getCategoriesName);

const setCategories = function (data) {
     let select = $id("changeCategorie");
     select.innerHTML = `<option value="none">-seç-</option>`;
     data.forEach(obj => {
          select.innerHTML += `<option value="${obj.name}">${obj.name}</option>`;
     });
     setArr();
}

function setArr() {
     allCV = [];
     currentIndex = 0;
     const selectedCategory = $id("changeCategorie").value || "none";

     users.forEach(user => {
          if (user[advType.value]) {
               user[advType.value].forEach(el => {
                    if (selectedCategory === "none" || el.categories === selectedCategory) {
                         allCV.push(el);
                    }
               });
          }
     });

     showCards(allCV);
}

function showCards(arr, append = false) {
     if (!append) card.innerHTML = "";

     let slice = arr.slice(currentIndex, currentIndex + step);
     slice.forEach(obj => {
          let profileImg = null;
          users.forEach(user => {
               if (user.name == obj.userName) profileImg = user.pImg;
          });

          if (obj.salary !== undefined) {
               card.innerHTML += `
          <a href="#" class="card" data-id="${obj.id}" title="${obj.description}">
            <ul>
              <li class="pp-d">
                <img src="${profileImg}" alt="Profil şəkli">
                <h2>${obj.userName}</h2>
              </li>
              <li class="job-content">
                <h3>${obj.job}</h3>
                <span class="category">${obj.categories}</span>
              </li>
              <li class="description">
                <p>Əlaqə: ${obj.phoneNumber}</p>
              </li>
              <li class="salary-date">
                <span>${obj.salary} AZN</span>
                <span>${formatAzDate(obj.date)}</span>
              </li>
            </ul>
          </a>`;
          } else {
               card.innerHTML += `
          <a href="#" class="card card-el" data-id="${obj.id}" title="${obj.description}">
            <ul>
              <li class="pp-d">
                <img src="${profileImg}" alt="Profil şəkli">
                <h2>Tələb edən: ${obj.userName}</h2>
              </li>
              <li class="job-content">
                <h3>${obj.job} vakansiyası mövcuddur</h3>
                <span class="category">${obj.categories}</span>
              </li>
              <li class="description">
                <p>Əlaqə: ${obj.phoneNumber}</p>
              </li>
              <li class="salary-date">
                <span>${obj.salary1 || ""} - ${obj.salary2 || ""} AZN</span>
                <span>${formatAzDate(obj.date)}</span>
              </li>
            </ul>
          </a>`;
          }

     });

     currentIndex += step;
}

$on(advType, "change", setArr);

$on($id("changeCategorie"), "change", setArr);

$on(moreW, "click", () => showCards(allCV, true));

$on(filterCV, "change", function () {
     currentIndex = 0;
     if (this.value == 1) {
          allCV.sort((a, b) => Number(a.salary || a.salary1) - Number(b.salary || b.salary1));
     }
     if (this.value == 2) {
          allCV.sort((a, b) => new Date(b.date) - new Date(a.date));
     }
     showCards(allCV);
});



const ucuzOption = filterCV.querySelector('option[value="1"]');

$on(advType, "change", function () {
     if (this.value === "JobAd") {
          if (ucuzOption.parentNode) filterCV.removeChild(ucuzOption);
     } else {
          if (!filterCV.querySelector('option[value="1"]')) {
               filterCV.insertBefore(ucuzOption, filterCV.querySelector('option[value="2"]'));
          }
     }
});

$(".cards").addEventListener("click", (e) => {
     const card = e.target.closest(".card");
     if (!card) return;
     localStorage.setItem("advID", JSON.stringify(card.dataset.id));
     window.location.replace("adv.html");
 });
 
