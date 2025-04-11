const navScrollElement = document.querySelector(".carousel-navbar");
let maxScrollValue = navScrollElement.scrollWidth - navScrollElement.clientWidth;
let controlScroll = document.querySelectorAll(".scrlbtn");
controlScroll.forEach(btn => btn.onclick = () => scrollNav(btn.value));
function scrollNav (operator){
     navScrollElement.scrollLeft = eval(`${navScrollElement.scrollLeft} ${operator} ${maxScrollValue/5}`);
}