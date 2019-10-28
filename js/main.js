const videoEl = document.getElementById('video');
const canvasEl = document.getElementById('motion');
const scoreEl = document.getElementById('score');
let score;

initSuccess = () => {
  DiffCamEngine.start();
}

initError = () => {
  alert('Something went wrong.');
}

capture = (payload) => {
  scoreEl.textContent = payload.score;
  score = payload.score;
}

DiffCamEngine.init({
  video: videoEl,
  motionCanvas: canvasEl,
  initSuccessCallback: initSuccess,
  initErrorCallback: initError,
  captureCallback: capture
});


const controls = {
  showCam: false,
  showMotion: false,
  velocityScale: 0.5,
  life: 0.005
}

const cam = document.getElementById('cam1');
const motion = document.getElementById('cam2');
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);

  noStroke();
  colorMode(HSB, 255);

  const gui = new dat.GUI();
  gui.add(controls, 'showCam');
  gui.add(controls, 'showMotion');
  gui.add(controls, 'velocityScale', -1, 1);
  gui.add(controls, 'life', 0, 0.01);
  gui.closed = true;

}

function generateParticle(){
  const x = random(windowWidth);
  const y = random(windowHeight);

  const size = random(5, 20);

  const vx = random(-1, 1) * (score / 45) * controls.velocityScale;
  const vy = random(-1, 1) * (score / 45) * controls.velocityScale;

  const hue = x % 255;
  fill(hue, 255, 255);

  particles.push({
    x, y, vx, vy, hue, size, life: 1.0
  })
}

function draw() {
  background(0);

  if (controls.showCam) {
    cam.style.setProperty('display', '')
  } else {
    cam.style.setProperty('display', 'none')
  }

  if (controls.showMotion) {
    motion.style.setProperty('display', '')
  } else {
    motion.style.setProperty('display', 'none')
  }
  
  if (score > 50) {
    generateParticle()
  }
  if (score > 100) {
    generateParticle()
  }
  if (score > 150) {
    generateParticle()
  }
  if (score > 200) {
    generateParticle()
  }
  if (score > 250) {
    generateParticle()
  }
  if (score > 300) {
    generateParticle()
  }

  updateParticles();

}

function updateParticles() {
  const outputParticles = [];

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += p.vx * controls.velocityScale;
    p.y += p.vy * controls.velocityScale;

    if (p.x >= windowWidth || p.x <= 0) {
      p.vx = -p.vx;
    }

    if (p.y >= windowHeight || p.y <= 0) {
      p.vy = -p.vy;
    }


    p.life -= controls.life;
    if (p.life > 0) {
      outputParticles.push(p);
    }

    fill(p.hue, 255, 255, p.life * 255);
    ellipse(p.x, p.y, p.size, p.size);
  }

  particles = outputParticles;

}
