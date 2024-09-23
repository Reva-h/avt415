// Function to change the content based on the window width
function updateMessage() {
    const messageElement = document.getElementById("message");
  
    if (window.innerWidth < 768) {
      messageElement.textContent = "Enjoy your special day on mobile!!";
    } else {
      messageElement.textContent = "Enjoy your special day on desktop!!";
    }
  }
  
  // Run the function when the page loads
  window.onload = updateMessage;
  
  // Run the function whenever the window is resized
  window.onresize = updateMessage;
  