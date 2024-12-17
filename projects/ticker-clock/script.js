
const template = document.querySelector("#clocknumbers");

document.querySelectorAll('ul').forEach((n, i)=>{
    const clone = template.content.cloneNode(true);
    n.appendChild(clone);
})

const update = function(delta) {
    const today = new Date();
    document.body.style.setProperty('--seconds-p', Math.floor(today.getSeconds() / 10));
    document.body.style.setProperty('--seconds-a', today.getSeconds() % 10);

    document.body.style.setProperty('--minutes-p', Math.floor(today.getMinutes() / 10));
    document.body.style.setProperty('--minutes-a', today.getMinutes() % 10);

    document.body.style.setProperty('--hours-p', Math.floor(today.getHours() / 10));
    document.body.style.setProperty('--hours-a', today.getHours() % 10);

    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
