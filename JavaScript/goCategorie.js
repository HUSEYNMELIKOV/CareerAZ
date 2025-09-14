$on(document, "DOMContentLoaded", async function () {
     try{
          let response = await fetch("/Data/jobs.json");
          let data = await response.json();
          let idDetail = localStorage.getItem("detailCategories");
          setCategorieDetail(data[0].jobsCategories.categories[idDetail]);
     } catch(err) {
          console.log(err);
     }
})

const setCategorieDetail = function (DataID) {
     let bannerBG = $(".parent .div1");
     let content = $(".parent .content");
     let cards = $(".grid-card",true);
     let cardsText = $(".card-text",true);
     bannerBG.style.background = DataID.detailsBg;
     content.innerText = DataID.name;
     cards.forEach((card, index) => {
          let img = card.querySelector("img");
          img.src = DataID.jobs[index].sectionImgURL;
          cardsText[index].innerText = DataID.jobs[index].name;
     })
}