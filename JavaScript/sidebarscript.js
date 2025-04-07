const BurgerBtn = document.getElementById("burger");
const closeSideBarBtn = document.getElementById("close-sidebar");
const sidebar = document.querySelector(".burger-sidebar");
const blockScreenDiv = document.querySelector(".block-screen");
function toggleFunction (){
     sidebar.classList.toggle("active");
     blockScreenDiv.classList.toggle("active");
}
blockScreenDiv.onclick = toggleFunction;
closeSideBarBtn.onclick = toggleFunction;
BurgerBtn.onclick = toggleFunction;
window.addEventListener("resize", function(){
     if(sidebar.classList.contains("active")){
          window.innerWidth >= 1024 ? toggleFunction() : null;
     }
})