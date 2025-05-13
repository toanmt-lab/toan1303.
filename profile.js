window.onload = function () {
  document.querySelector("header").classList.add("loaded");
  document.querySelector(".profile-image").classList.add("loaded");
  document.querySelector(".text-content").classList.add("loaded");

  const themeSwitch = document.getElementById("themeSwitch");
  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  });

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
};
// Định nghĩa hàm trailing
var trailing = function (settings) {
  var pub = {
    canvasId: settings["canvasId"] !== undefined ? settings["canvasId"] : "trailCanvas",
    width: window.innerWidth,
    height: window.innerHeight,
    radius: 20,
    quantity: 15,
    particleColor: "#c0362f",
    particleSize: 3.5,
    particleTargetSize: 2,
    position: { x: 0, y: 0 },
  };

  var internal = {
    canvas: null,
    context: null,
    particles: [],
    loopInterval: null,
  };

  pub.init = function () {
    internal.canvas = document.getElementById(pub.canvasId);
    internal.context = internal.canvas.getContext("2d");
    internal.canvas.width = pub.width;
    internal.canvas.height = pub.height;
    if (internal.canvas && internal.canvas.getContext) {
      internal.createParticles();
      internal.loopInterval = setInterval(internal.loop, 1000 / 120);
    }
  };

  pub.stop = function () {
    if (internal.loopInterval) {
      clearInterval(internal.loopInterval);
      internal.loopInterval = null;
      internal.context.clearRect(0, 0, internal.canvas.width, internal.canvas.height);
    }
  };

  internal.createParticles = function () {
    internal.particles = [];
    for (var i = 0; i < pub.quantity; i++) {
      var particle = {
        position: { x: pub.position.x, y: pub.position.y },
        shift: { x: pub.position.x, y: pub.position.y },
        size: pub.particleSize,
        angle: 0,
        speed: 0.01 + Math.random() * 0.02,
        targetSize: pub.particleTargetSize,
        fillColor: pub.particleColor,
        orbit: pub.radius * 0.5 + pub.radius * 0.5 * Math.random(),
      };
      internal.particles.push(particle);
    }
  };

  internal.loop = function () {
    internal.context.clearRect(0, 0, internal.context.canvas.width, internal.canvas.height);
    for (var i = 0; i < internal.particles.length; i++) {
      var particle = internal.particles[i];
      var lp = { x: particle.position.x, y: particle.position.y };
      particle.angle += particle.speed;
      particle.shift.x += (pub.position.x - particle.shift.x) * particle.speed;
      particle.shift.y += (pub.position.y - particle.shift.y) * particle.speed;
      particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * particle.orbit;
      particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * particle.orbit;
      particle.position.x = Math.max(Math.min(particle.position.x, pub.width), 0);
      particle.position.y = Math.max(Math.min(particle.position.y, pub.height), 0);
      particle.size += (particle.targetSize - particle.size) * 0.05;
      if (Math.round(particle.size) == Math.round(particle.targetSize)) {
        particle.targetSize = 0.5 + Math.random() * 3;
      }
      internal.context.beginPath();
      internal.context.fillStyle = particle.fillColor;
      internal.context.strokeStyle = particle.fillColor;
      internal.context.lineWidth = particle.size;
      internal.context.moveTo(lp.x, lp.y);
      internal.context.lineTo(particle.position.x, particle.position.y);
      internal.context.stroke();
      internal.context.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2, true);
      internal.context.fill();
    }
  };

  return pub;
};

// Hàm xử lý mousemove
const handleMouseMove = (trail) => (e) => {
  trail.position.x = e.clientX;
  trail.position.y = e.clientY;
};

// window.onload
window.onload = function () {
  // Welcome overlay animation
  const welcomeOverlay = document.querySelector(".welcome-overlay");
  const welcomeCenter = document.querySelector(".welcome-center");

  setTimeout(() => {
    welcomeCenter.classList.add("animate-zoom");
  }, 1500);

  setTimeout(() => {
    welcomeOverlay.style.display = "none";
  }, 3000);

  // Load content
  setTimeout(() => {
    document.querySelector("header").classList.add("loaded");
    document.querySelector(".profile-image").classList.add("loaded");
    document.querySelector(".text-content").classList.add("loaded");
  }, 2800);

  // Theme switch
  const themeSwitch = document.getElementById("themeSwitch");
  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  });

  // Hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Trail effect (only on non-mobile)
  const isMobile = window.innerWidth <= 900;
  if (!isMobile) {
    const trail = new trailing({});
    const reduceMotionToggle = document.getElementById("cb3-8"); // Sửa ID cho đúng với HTML

    // Kiểm tra nếu reduceMotionToggle tồn tại
    if (reduceMotionToggle) {
      // Hàm xử lý mousemove được định nghĩa riêng để có thể gỡ bỏ dễ dàng
      const mouseMoveHandler = handleMouseMove(trail);

      // Kiểm tra trạng thái ban đầu của toggle
      if (reduceMotionToggle.checked) {
        trail.init();
        document.addEventListener("mousemove", mouseMoveHandler);
      }

      // Sự kiện thay đổi trạng thái toggle
      reduceMotionToggle.addEventListener("change", function () {
        if (this.checked) {
          trail.init();
          document.addEventListener("mousemove", mouseMoveHandler);
        } else {
          trail.stop();
          document.removeEventListener("mousemove", mouseMoveHandler);
        }
      });
    } else {
      console.warn("reduceMotionToggle not found. Trail effect will not be initialized.");
    }
  }
};
const audio = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
audio.volume = 0.3; // Âm lượng mặc định
let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    musicToggle.textContent = "Play Music";
  } else {
    audio.play().catch((err) => console.log("Lỗi phát nhạc:", err));
    musicToggle.textContent = "Pause Music";
  }
  isPlaying = !isPlaying;
});
