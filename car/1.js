document.addEventListener('DOMContentLoaded', () => {
    // Asset Definitions
    const ASSETS = {
      COLOR: {
        TAR: ["#959298", "#9c9a9d"],
        RUMBLE: ["#959298", "#f5f2f6"],
        GRASS: ["#eedccd", "#e6d4c5"],
      },
      IMAGE: {
        TREE: { src: "images/tree.png", width: 132, height: 192 },
        HERO: { src: "images/hero.png", width: 110, height: 56 },
        CAR: { src: "images/car04.png", width: 50, height: 36 },
        FINISH: { src: "images/finish.png", width: 339, height: 180, offset: -0.5 },
        SKY: { src: "images/cloud.jpg" },
      },
      AUDIO: {
        theme: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/155629/theme.mp3",
        engine: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/155629/engine.wav",
        honk: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/155629/honk.wav",
        beep: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/155629/beep.wav",
      },
    };
  
    // Utility Functions
    const timestamp = () => new Date().getTime();
    const accelerate = (v, accel, dt) => v + accel * dt;
    const isCollide = (x1, w1, x2, w2) => (x1 - x2) ** 2 <= (w2 + w1) ** 2;
  
    Number.prototype.pad = function (numZeros, char = 0) {
      const n = Math.abs(this);
      const zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
      const zeroString = Math.pow(10, zeros)
        .toString()
        .substr(1)
        .replace(0, char);
      return zeroString + n;
    };
  
    Number.prototype.clamp = function (min, max) {
      return Math.max(min, Math.min(this, max));
    };
  
    // Game Logic
    class Line {
      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.X = 0;
        this.Y = 0;
        this.W = 0;
        this.curve = 0;
        this.scale = 0;
        this.elements = [];
        this.special = null;
      }
  
      project(camX, camY, camZ) {
        this.scale = camD / (this.z - camZ);
        this.X = (1 + this.scale * (this.x - camX)) * halfWidth;
        this.Y = Math.ceil(((1 - this.scale * (this.y - camY)) * height) / 2);
        this.W = this.scale * roadW * halfWidth;
      }
  
      clearSprites() {
        this.elements.forEach((e) => (e.style.background = "transparent"));
      }
  
      drawSprite(depth, layer, sprite, offset) {
        const destX = this.X + this.scale * halfWidth * offset;
        const destY = this.Y + 4;
        const destW = (sprite.width * this.W) / 265;
        const destH = (sprite.height * this.W) / 265;
  
        const obj = layer instanceof Element ? layer : this.elements[layer + 6];
        obj.style.background = `url(${sprite.src}) no-repeat center`;
        obj.style.backgroundSize = "contain";
        obj.style.left = `${destX - destW}px`;
        obj.style.bottom = `${destY}px`;
        obj.style.height = `${destH}px`;
        obj.style.width = `${destW}px`;
      }
  
      drawCurve(depth, layer, color) {
        const destX1 = this.X - this.W;
        const destX2 = layer.X - layer.W;
        const destW1 = this.X + this.W - destX1;
        const destW2 = layer.X + layer.W - destX2;
  
        const obj = layer instanceof Element ? layer : this.elements[layer + 6];
        obj.style.borderTop = `${height - layer.Y - 1}px solid ${color}`;
        obj.style.left = `${destX1}px`;
        obj.style.width = `${destW1}px`;
        obj.style.borderLeft = `${destX2 - destX1}px solid transparent`;
        obj.style.borderRight = `${destW2 - destW1}px solid transparent`;
        obj.style.bottom = "0px";
      }
    }
  
    // Audio Class to Handle Game Sounds
    class AudioPlayer {
      constructor() {
        this.audio = new Audio();
      }
  
      play(sound) {
        this.audio.src = sound;
        this.audio.play();
      }
    }
  
    // Initialization Code
    const road = [];
    const hero = document.getElementById("hero");
    const audio = new AudioPlayer();
  
    const camD = 0.84;
    const height = window.innerHeight;
    const halfWidth = window.innerWidth / 2;
    const roadW = 2000;
  
    // Game Loop
    function gameLoop() {
      // Update game state and render
      requestAnimationFrame(gameLoop);
    }
  
    // Start the game
    gameLoop();
  });
  