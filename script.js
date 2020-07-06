let api = 'https://api.are.na/v2/channels/';
let channel = 'space-yqxzpk6lr40';
let request = api + channel;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(this.responseText);
      displayRequestResult(res);
  }
};
xmlhttp.open("GET", request, true);
xmlhttp.send();

const slideshow = document.querySelector(".slideshow");
const list = document.querySelector(".slideshow .slides");
const btns = document.querySelectorAll(".slideshow .arrows .arrow");
const prevBtn = document.querySelector(".slideshow .arrow-prev");
const prevBtnChild = document.querySelector(".slideshow .arrow-prev span");
const nextBtn = document.querySelector(".slideshow .arrow-next");
const nextBtnChild = document.querySelector(".slideshow .arrow-next span");
const main = document.querySelector("main");
const autoplayInterval = parseInt(slideshow.dataset.autoplayInterval) || 4000;
const isActive = "is-active";
const isVisible = "is-visible";
let intervalID;


function displayRequestResult(res)
{
  let title = res.title;
  console.log(title);
  let pics = [];
  res.contents.forEach(content => {
    if(content.source != null )
    {
      let url = content.source.url;
      pics.push(url);
      // console.log(url)
    }
  });

  pics.forEach(function(pic, index){
    console.log(pic);
    var li = document.createElement("li");
    li.classList.add("slide");

    // If we're at the first slide
    if(index == 0 )
    {
      li.classList.add("is-active");
    }
    var div = document.createElement("div");
    div.classList.add("cover");
    div.style.backgroundImage = "url('"+pic+"')";

    li.appendChild(div);
    list.appendChild(li);
  });
  slideshow.dataset.autoplay = true;
  changeSlide();
  autoPlay();
  stopAutoPlayOnHover();
  customizeArrows();
}


function changeSlide() {
  for (const btn of btns) {
    btn.addEventListener("click", e => {
      const activeSlide = document.querySelector(".slide.is-active");
      activeSlide.classList.remove(isActive);
      if (e.currentTarget === nextBtn) {
        activeSlide.nextElementSibling
          ? activeSlide.nextElementSibling.classList.add(isActive)
          : list.firstElementChild.classList.add(isActive);
      } else {
        activeSlide.previousElementSibling
          ? activeSlide.previousElementSibling.classList.add(isActive)
          : list.lastElementChild.classList.add(isActive);
      }
    });
  }
}

function autoPlay() {
  if (slideshow.dataset.autoplay === "true") {
    intervalID = setInterval(() => {
      nextBtn.click();
    }, autoplayInterval);
  }
}

function stopAutoPlayOnHover() {
  if (
    slideshow.dataset.autoplay === "true" &&
    slideshow.dataset.stopAutoplayOnHover === "true"
  ) {
    slideshow.addEventListener("mouseenter", () => {
      clearInterval(intervalID);
    });

    slideshow.addEventListener("touchstart", () => {
      clearInterval(intervalID);
    });
  }
}

function customizeArrows() {
  slideshow.addEventListener("mousemove", mousemoveHandler);
  slideshow.addEventListener("touchmove", mousemoveHandler);
  slideshow.addEventListener("mouseleave", mouseleaveHandler);
  // main.addEventListener("touchstart", mouseleaveHandler);
}

function mousemoveHandler(e) {
  const width = this.offsetWidth;
  const xPos = e.pageX;
  const yPos = e.pageY;
  const xPos2 = e.pageX - nextBtn.offsetLeft - nextBtnChild.offsetWidth;

  if (xPos > width / 2) {
    prevBtn.classList.remove(isVisible);
    nextBtn.classList.add(isVisible);

    nextBtnChild.style.left = `${xPos2}px`;
    nextBtnChild.style.top = `${yPos}px`;
  } else {
    nextBtn.classList.remove(isVisible);
    prevBtn.classList.add(isVisible);

    prevBtnChild.style.left = `${xPos}px`;
    prevBtnChild.style.top = `${yPos}px`;
  }
}

function mouseleaveHandler() {
  prevBtn.classList.remove(isVisible);
  nextBtn.classList.remove(isVisible);
}