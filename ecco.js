let frame = 0;
let context = null;
let img = null;

function createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas.getContext('2d');
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            resolve(img);
        }
    });
}

function draw() {
    const adjusts = generate_for_offset(frame);
    for (let y = 0; y < 224; y++) {
        const x = adjusts[y];
        context.drawImage(img, 0, y, 384, 1, -x, y, 384, 1);
    }
    frame++;
    requestAnimationFrame(draw);
}

function init() {
    context = createCanvas(320, 224);
    loadImage('background.png').then((background) => {
        img = background;
        requestAnimationFrame(draw);
    });
}

init();
