const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

const prizes = [
{text:"حظ أوفر",chance:65,color:"#b0bec5"},
{text:"ستاند مراوح",chance:11,color:"#42a5f5"},
{text:"ساعة ذكية",chance:11,color:"#66bb6a"},
{text:"كيبورد مضيئ",chance:11,color:"#ffca28"},
{text:"لابتوب ميني",chance:2,color:"#ef5350"}
];

function draw(){
let angle=0;
prizes.forEach(p=>{
let slice=(p.chance/100)*Math.PI*2;
ctx.beginPath();
ctx.moveTo(150,150);
ctx.arc(150,150,150,angle,angle+slice);
ctx.fillStyle=p.color;
ctx.fill();
ctx.save();
ctx.translate(150,150);
ctx.rotate(angle+slice/2);
ctx.fillStyle="#000";
ctx.font="14px Arial";
ctx.fillText(p.text,100,0);
ctx.restore();
angle+=slice;
});
}
draw();

function pick(){
let r=Math.random()*100,s=0;
for(let p of prizes){s+=p.chance;if(r<=s)return p;}
}

function spin(){
spinSound.play();
const win=pick();
canvas.style.transition="transform 4s ease-out";
canvas.style.transform=`rotate(${1440+Math.random()*360}deg)`;
setTimeout(()=>{
spinSound.pause();
spinSound.currentTime=0;
winSound.play();
document.getElementById("result").innerHTML=`🎉 مبروك!<br>ربحت: <b>${win.text}</b> 🎊`;
},4000);
}
