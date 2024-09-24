// Function to change the content based on the window width

function updateMessage() {
    const messageElement = document.getElementById("message");
  
    if (window.innerWidth < 768) {
      messageElement.textContent = "Enjoy your special day on mobile!";
    } else {
      messageElement.textContent = "Enjoy your special day on desktop!";
    }
  }

  // Run confetti and message update when the page loads
  window.onload = function() {
    updateMessage();  // Call the function
    shoot = true;     // Set the variable
};

  
  // Run the function whenever the window is resized
  window.onresize = updateMessage;

// Setup the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let dpr = window.devicePixelRatio || 1;  // Device Pixel Ratio for sharper rendering
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);

// Confetti properties
const confettiParticles = [];
const confettiColors = ['#ffffff'];  // White color for all confetti
const gravity = 0.5; // Falling speed of confetti

// Handle window resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
});

// Function to create a confetti particle
function createConfetti(x, y) {
  for (let i = 0; i < 100; i++) {
    // Random offsets for more natural spread around the click point
    const offsetX = Math.random() * 100 - 50; // Spread horizontally
    const offsetY = Math.random() * 100 - 50; // Spread vertically

    confettiParticles.push({
      x: x + offsetX, // Apply random horizontal offset
      y: y + offsetY, // Apply random vertical offset
      size: Math.random() * 10 + 5, // Random size between 5 and 15
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      velocityX: Math.random() * 4 - 2, // More random horizontal speed
      velocityY: Math.random() * -10 - 3, // More random vertical speed
      rotation: Math.random() * 360, // Rotation angle
      rotationSpeed: Math.random() * 10 - 5, // How fast the confetti rotates
    });
  }
}

// Function to update and draw confetti
function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach((particle, index) => {
    // Apply gravity and update positions
    particle.velocityY += gravity;
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.rotation += particle.rotationSpeed;

    // Remove confetti that falls off the screen
    if (particle.y > canvas.height || particle.x < 0 || particle.x > canvas.width) {
      confettiParticles.splice(index, 1);
    } else {
      // Draw confetti
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
    }
  });

  // Continue updating
  requestAnimationFrame(updateConfetti);
}

// Start animation loop
updateConfetti();

// Add click event to trigger confetti burst
window.addEventListener('click', (event) => {
  createConfetti(event.clientX, event.clientY); // Create confetti at click position
});
