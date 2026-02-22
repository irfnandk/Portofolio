/* TYPING TEXT */
const text = ["Mahasiswa IKIP PGRI BOJONEGORO", "Design Grafis", "19 Tahun"];
let i=0,j=0,cur="";
const typing = document.getElementById("typing");

function type(){
  if(j < text[i].length){
    cur += text[i][j];
    typing.innerHTML = cur + "|";
    j++;
    setTimeout(type,80);
  }else{
    setTimeout(erase,1500);
  }
}

function erase(){
  if(j>0){
    cur = cur.slice(0,-1);
    typing.innerHTML = cur + "|";
    j--;
    setTimeout(erase,40);
  }else{
    i=(i+1)%text.length;
    type();
  }
}
type();

/* 3D TILT */
const card = document.getElementById("tilt");
document.addEventListener("mousemove", e=>{
  let x = (window.innerWidth/2 - e.pageX)/30;
  let y = (window.innerHeight/2 - e.pageY)/30;
  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

/* PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles=[];
for(let i=0;i<120;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-.5)*0.4,
    vy:(Math.random()-.5)*0.4
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.fillStyle="rgba(138,43,226,0.8)";
    ctx.fillRect(p.x,p.y,2,2);
  });
  requestAnimationFrame(animate);
}
animate();

/* MENU TOGGLE */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.onclick = () => navMenu.classList.toggle("active");

/* SMOOTH SCROLL */
document.querySelectorAll("nav a").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({behavior:"smooth"});
    navMenu.classList.remove("active");
  });
});

/* ACTIVE MENU */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", ()=>{
  let current="";
  sections.forEach(sec=>{
    if(scrollY >= sec.offsetTop - 120){
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(a=>{
    a.classList.remove("active");
    if(a.getAttribute("href") == "#"+current){
      a.classList.add("active");
    }
  });
});
