let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
let count = 0;
const data = [];
// const data = JSON.parse(localStorage.getItem('stickynote')) ?? [];

function render(){
  document.querySelector('body').innerHTML = data.map((content) => `<div class="note-box" data-index=${content.indexnum} style="left:${content.left};  top:${content.top}"><div></div><button class="clost-btn">X</button><textarea placeholder="메모를입력하세요..." class="content-box" style="width:${content.width}px; height:${content.height}px;"></textarea></div>`);
}

function onMousedown(event) {
  if (event.button == 2) {
    data.push({width : 200, height : 116, left : cursorx, top : cursory, indexnum : count})
    count ++;
    render();
    
  } else if (event.target.getAttribute('class') === 'clost-btn') {
    event.target.parentNode.remove();
    const eventindex = Number(event.target.parentNode.dataset.index);
    
    for(let i = 0; i < data.length; i++){  
      if (data[i].indexnum === eventindex) { 
        data.splice(i, 1); 
        i--; 
      }
    }
    console.log(data)
    // console.log(eventindex)
    // const targetElemet = data.find((i) => i.index === eventindex);
    // const chagedata = {width : 300, height : 500, left : event.target.parentNode.getBoundingClientRect().left, top : event.target.parentNode.getBoundingClientRect().top, indexnum : eventindex}
    // data.splice(eventindex - 1, 0, chagedata)
    
  } else if (event.button === 0 && event.target.tagName === 'DIV') {
    findX = event.pageX - event.target.parentNode.getBoundingClientRect().left;
    findY = event.pageY - event.target.parentNode.getBoundingClientRect().top;
    isDragging = true
    document.body.append(event.target.parentNode);
  }
  localStorage.setItem("stickynote", JSON.stringify(data));
}

function onMouseup(event){
  
  isDragging = false
  if (event.button === 0 && event.target.getAttribute('class') === 'content-box') {
    document.body.append(event.target.parentNode);
    event.target.focus();
  }
}

function onMousemove(event){
  const movetarget = document.querySelector('body > div:last-of-type');
  cursorx = `${event.pageX}px`;
  cursory = `${event.pageY}px`;
  if (isDragging) {
    movetarget.style.top = `${event.pageY - findY - 8}px`;
    movetarget.style.left = `${event.pageX - findX - 8}px`;
  }
  localStorage.setItem("stickynote", data);
}

function onKeyup(event){
  if(event.target.getAttribute('class') === 'content-box'){
    // data.push({width : event.target.offsetWidth, height : event.target.offsetHeight, left : findbox.getBoundingClientRect().left, top : findbox.getBoundingClientRect().top} );
  }
}

render();

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keyup', onKeyup);