const colores = ['#ffffff', '#b3e5fc', '#81d4fa', '#f8bbd0'];
let ultimo = 0;

function brillito(x, y) {
    const s = document.createElement('span');
    s.className = 'brillito';
    s.textContent = '✦';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.fontSize = (8 + Math.random() * 12) + 'px';
    s.style.color = colores[Math.floor(Math.random() * colores.length)];
    s.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
    s.style.setProperty('--dy', (20 + Math.random() * 30) + 'px');
    document.body.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
}

// Respeta a quien tiene activada la opción de reducir movimiento
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('pointermove', (e) => {
        const ahora = performance.now();
        if (ahora - ultimo < 40) return;   // máximo un brillito cada 40 ms
        ultimo = ahora;
        brillito(e.clientX, e.clientY);
    });
}

const intro = document.getElementById('intro');
intro.addEventListener('click', () => {
    intro.classList.add('oculto');
    document.body.classList.add('entro');   // avisa al CSS que ya puede animar
});