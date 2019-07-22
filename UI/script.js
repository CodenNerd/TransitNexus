
const turnHero = () =>{
    
    let hero1 = document.querySelector('.hero1');
    hero1.style.animation = "turn-hero1 1.5s ease-in-out forwards";
    let hero2 = document.querySelector('.hero2');
    hero2.style.animation = "turn-hero2 1.5s ease-in-out 1.0s forwards";
    
}

const clickLogIn = () =>{
    const loginButton = document.querySelector('.login-button');

    loginButton.addEventListener('click', ()=>{
        turnHero();
    }) 
}

clickLogIn();