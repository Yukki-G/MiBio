const simbolos = ['♡', '✧', '✦', '✞', '⋆','☁', 'ᯓ★'];
const colores  = ['#ffffff', '#bde7ff'];
let ultimo = 0;

const azar = (min, max) => min + Math.random() * (max - min);

function brillito(x, y, fuerza = 1) {
    const s = document.createElement('span');
    s.className = 'brillito';
    s.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.fontSize = azar(14, 28) + 'px';
    s.style.color = colores[Math.floor(Math.random() * colores.length)];
    s.style.setProperty('--dx', azar(-30, 30) * fuerza + 'px');
    s.style.setProperty('--dy', azar(30, 70) * fuerza + 'px');
    s.style.setProperty('--giro', azar(-90, 90) + 'deg');
    document.body.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Estela al mover el cursor
    document.addEventListener('pointermove', (e) => {
        const ahora = performance.now();
        if (ahora - ultimo < 200) return;
        ultimo = ahora;
        brillito(e.clientX, e.clientY);
    });

    // Explosión de corazones al hacer clic
    document.addEventListener('pointerdown', (e) => {
        for (let i = 0; i < 8; i++) brillito(e.clientX, e.clientY, 2.5);
    });
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