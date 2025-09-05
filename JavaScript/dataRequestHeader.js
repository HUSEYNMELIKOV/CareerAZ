const getJobs = async () => {
     try {
          let response = await fetch("/Data/jobs.json");
          let data = await response.json();
          loadSidebarCategories(data);
     } catch (err) {
          console.error(err);
     }
};
$on(document,"DOMContentLoaded", getJobs )
window.allFetches = window.allFetches ? window.allFetches : [];
window.allFetches.push(getJobs); 
console.log(window.allFetches)
const loadSidebarCategories = (data) => {
     const collapseWrapperUl = $(".wrapper-collapse ul");
     data[0].jobsCategories.categories.forEach((categorie) => {
          collapseWrapperUl.innerHTML +=
               `
                    <button class="categorie listelement">
                         <span>${categorie.name}</span>
                         <i class="fa-solid fa-arrow-right"></i>
                    </button>
               `;
     })
}
