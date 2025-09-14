const getJobs = async () => {
     try {
          let response = await fetch("/Data/jobs.json");
          let data = await response.json();
          loadSidebarCategories(data);
     } catch (err) {
          console.error(err);
     }
};

$on(document, "DOMContentLoaded", getJobs);

let linkArr = new Array();

const loadSidebarCategories = (data) => {
     const collapseWrapperUl = $(".wrapper-collapse ul");
     data[0].jobsCategories.categories.forEach((categorie) => {
          collapseWrapperUl.innerHTML +=
               `
                    <a href="userPosting.html" data-id="${categorie.id}" class="categorie listelement">
                         <span>${categorie.name}</span>
                         <i class="fa-solid fa-arrow-right"></i>
                    </a>
               `;
     })
}




window.allFetches = window.allFetches ? window.allFetches : [];
window.allFetches.push(getJobs); 
