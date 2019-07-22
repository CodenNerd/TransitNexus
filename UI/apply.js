let clicked = true;

const applyListener = bid => {
  let button = document.querySelector(bid);

  if (clicked) {
    applied(button);
    clicked = false;
    return;
  }
  apply(button);
  clicked = true;
};
const applied = button => {
  button.innerHTML = "x";
  button.style.backgroundColor = "rgb(192, 0, 0)";
};
const apply = button => {
  button.innerHTML = "Apply";
  button.style.backgroundColor = "rgb(0, 142, 189)";
};

let detailsDiv = document.getElementsByClassName('details-div')[0];
let body = document.querySelector(':not(.details-div)');
const showDetails = () => {
  body.addEventListener('click', ()=>{
  alert();
});
    detailsDiv.style.display = "block";

};

const hideDetails = () => {
    detailsDiv.style.display = "none";
};



