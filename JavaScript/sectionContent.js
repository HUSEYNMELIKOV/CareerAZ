
const getCategoriesName = async () => {
     try {
          let response = await fetch("/Data/jobs.json");
          let data = await response.json();
          handleData(data);
     } catch (err) {
          console.error(err);
     }
};
$on(document, "DOMContentLoaded", getCategoriesName);

const handleData = (data) => {
     data[0].jobsCategories.categories.forEach(obj => {
          $(".content-section .categories-link ul.links")
               .innerHTML +=
               `
               <li>
                    <a href="#">
                         <div class="icon">
                              <img src="${obj.icon}">
                         </div>
                         <span>${obj.name}</span>
                    </a>
               </li>
          `;
          obj.jobs.forEach(jobObj => {
               if (jobObj.isContentSection) {
                    $(".content-section .container-2 .cards.parent")
                         .innerHTML +=
                         `
                    <a href="#">
                         <div class="card popular-service">
                              <div class="job-name">
                                   <h2>${jobObj.name}</h2>
                              </div>
                              <div class="img-box">
                                   <img src="${jobObj.sectionImgURL}">
                              </div>
                         </div>
                    </a>
                    `
               }
          })
     })
};
let serSladeControls = $("section.content-section .container-2 .control", true);
let prev = serSladeControls[0];
let next = serSladeControls[1];

$on(next, "click", function (e) { 
     let step = $(".content-section .container-2 .cards.parent").clientWidth;
     $(".content-section .container-2 .cards.parent").scrollBy({ left: step, behavior: "smooth" });
     console.log(e);
})
$on(prev, "click", function (e) { 
     let step = $(".content-section .container-2 .cards.parent").clientWidth;
     $(".content-section .container-2 .cards.parent").scrollBy({ left: -step, behavior: "smooth" });
     console.log(e);
})

window.allFetches = window.allFetches ? window.allFetches : [];
window.allFetches.push(getData()); 