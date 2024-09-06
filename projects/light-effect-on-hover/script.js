document.addEventListener('mousemove', (evt) => {
    const light = document.getElementById('light');
    light.style.top = `${evt.clientY - 150}px`; // Center the light effect vertically
    light.style.left = `${evt.clientX - 150}px`; // Center the light effect horizontally
});
