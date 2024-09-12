// let div =document.querySelector("div");
// let ul = document.querySelector("ul");
// let li= document.querySelectorAll("li");

// div.addEventListener("click", function(){
//     console.log("div was clicked");
// });

// ul.addEventListener("click", function(event){
//     event.stopPropagation();//to stop bubling
//     console.log("ul was clicked");
// })

// for(li of li){
// li.addEventListener("click", function(event){
//     event.stopPropagation();//to stop bubling
//     console.log("li was clicked");
// })
// }

// let btn =document.querySelector("button");
// let ul = document.querySelector("ul");
// let inp=document.querySelector("input");

// btn.addEventListener("click",function(){
//     let item= document.createElement("li");
//     item.innerText=inp.value;

//     let delbtn=document.createElement("button");
//     delbtn.innerText="delete";
//     delbtn.classList.add("delete");
//     item.appendChild(delbtn);
//     ul.append(item);
//     inp.value="";
// })
// ul.addEventListener("click",function(event){
//     if(event.target.nodeName=="BUTTON"){
//         let listitem= event.target.parentElement;
//         listitem.remove();
//         console.log("deleted");
//     } 
// });

// let delbtn= document.querySelectorAll(".delete");
// for(delbtn of delbtn){
//     delbtn.addEventListener("click",function(){
//         let par=this.parentElement;
//         console.log(par);
//         par.remove();
//     })
// }

// simon Game

let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","green","purple"];
let high=[];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("Flash");
    setTimeout(function(){
        btn.classList.remove("Flash");
    }, 300);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 300);
}

function levelUp(){
    userSeq=[];
    
    level++;
    h2.innerText=`Level ${level}`;

    let randidx= Math.floor(Math.random()*4);
    let randcolor=btns[randidx];
    let randbtn= document.querySelector(`.${randcolor}`);
    // console.log(randidx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    btnFlash(randbtn);
    high.push(`${level}`);
}

function check(idx){
   //console.log("cur level:", level);

   if(gameSeq[idx]=== userSeq[idx]){
    if(userSeq.length==gameSeq.length){ 
        setTimeout(levelUp, 1000);
    }
   } else {
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    }, 300);
    h2.innerHTML=`game Over! highest score is <b> ${Math.max(...high)}</b> <br>press key to start`;

    reset();
    btnpress();
    
   }
   
}
function btnpress(){
    let btn= this;
    userFlash(btn);
    usercolor= btn.getAttribute('id');
    console.log(usercolor);
    userSeq.push(usercolor);

    check(userSeq.length-1);
}

let allbtn=document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started= false;
    gameSeq=[];
    userSeq=[];
    level=0;
}