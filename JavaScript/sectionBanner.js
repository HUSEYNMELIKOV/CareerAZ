
const getSectionCategories = async () => {
     try {
          let response = await fetch("/Data/sectionCategories.json");
          let data = await response.json();
          getDataSection_1(data);
     } catch (err) {
          console.error(err);
     }
};
$on(document, "DOMContentLoaded", getSectionCategories);


const getDataSection_1 = (data) => {
     data.categories.forEach(obj => {
          $("section.banner .categories ul").innerHTML +=
               `
          <li>
               <button class="bannerCards" data-id="${obj.id}">
               <span>${obj.name}</span> 
               <i class="fa-solid fa-arrow-right"></i>
               </button>
          </li>
          `
     });
     let allCards = $("section.banner .categories ul .bannerCards", true);
     allCards.forEach(btn => {
          $on(btn, "click", function () {
               localStorage.setItem("detailCategories", btn.dataset.id);
               window.location.href = "detailCategories.html"
          })

     })

     data.trustedBy.forEach(obj => {
          $("section.banner .trusted-by .list").innerHTML +=
               `
          <li>
               <img src="${obj.svg}">
          </li>
          `
     })
}

$on($("section.banner .contents .bottom-content .start-stop-bgVid button"), "click", function () {
     $cc(this.querySelector("i"), "fa-pause", "toggle");
     $cc(this.querySelector("i"), "fa-play", "toggle");
     $cc(this.querySelector("i"), "fa-play", "contains") ? $id("banner-video").pause()
          : $id("banner-video").play();
})

const Observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
          !entry.isIntersecting ?
               ($cc($("header .for-observer"), "visible", "add"))
               : ($cc($("header .for-observer"), "visible", "remove"))
     })
}, {
     root: null,
     threshold: 0,
     rootMargin: "-100px 0px 0px 0px"
})

Observer.observe($("section.banner .banner-search"));

window.allFetches = window.allFetches ? window.allFetches : [];
window.allFetches.push(getSectionCategories); 