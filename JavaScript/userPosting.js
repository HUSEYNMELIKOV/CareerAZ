let advType = $id("type");
let filterCV = $id("filtrCV");
let card = $(".container .cards");
let moreW = $id("wMore");
let users = JSON.parse(localStorage.getItem("UsersData"));
let allCV = [];

const monthsAz = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"
];

function formatAzDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${monthsAz[d.getMonth()]} ${d.getFullYear()}`;
}

let currentIndex = 0;
const step = 8;

function setArr() {
  allCV = [];                // sıfırla
  currentIndex = 0;          // indexi sıfırla

  users.forEach(obj => {
    if (obj[advType.value]) {
      obj[advType.value].forEach(el => allCV.push(el));
    }
  });

  showCards(allCV);          // yeni dəyərləri göstər
}

function showCards(arr, append = false) {
  if (!append) card.innerHTML = "";

  let slice = arr.slice(currentIndex, currentIndex + step);
  slice.forEach(obj => {
    card.innerHTML += `
      <a href="#" class="card" data-id="${obj.id}" title="${obj.description}">
        <ul>
          <li class="pp-d">
            <img src="${obj.pImg}" alt="Profil şəkli">
            <h2>${obj.userName}</h2>
          </li>
          <li class="job-content">
            <h3>${obj.job}</h3>
            <span class="category">${obj.categories}</span>
          </li>
          <li class="description">
            <p>${obj.phoneNumber}</p>
          </li>
          <li class="salary-date">
            <span>${obj.salary} AZN</span>
            <span>${formatAzDate(obj.date)}</span>
          </li>
        </ul>
      </a>`;
  });

  currentIndex += step;
}

// ilk dəfə `advType` value-ya görə qur
setArr();

// advType dəyişəndə yenidən qur
$on(advType, "change", setArr);

// load more düyməsi
$on(moreW, "click", () => showCards(allCV, true));

// filter (maaş və tarix sıralama)
$on(filterCV, "change", function () {
  currentIndex = 0;
  if (this.value == 1) {
    allCV.sort((a, b) => Number(a.salary) - Number(b.salary));
  }
  if (this.value == 2) {
    allCV.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  showCards(allCV);
});
