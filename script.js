document.addEventListener("DOMContentLoaded", function () {
  const charactersGrid = document.getElementById("characters-grid");
  const characterModal = document.getElementById("character-modal");
  const modalName = document.getElementById("modal-name");
  const modalImage = document.getElementById("modal-image");
  const modalLocation = document.getElementById("modal-location");
  const modalOrigin = document.getElementById("modal-origin");
  const closeBtn = document.querySelector(".close-btn");

  // Fetch characters from Rick and Morty API
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((character) => {
        // Create card for each character
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <a href="#" data-name="${character.name}" data-image="${character.image}" data-location="${character.location.name}" data-origin="${character.origin.name}">View Details</a>
                `;
        charactersGrid.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Show modal with character details
  charactersGrid.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      event.preventDefault();
      const name = event.target.getAttribute("data-name");
      const image = event.target.getAttribute("data-image");
      const location = event.target.getAttribute("data-location");
      const origin = event.target.getAttribute("data-origin");

      modalName.textContent = name;
      modalImage.src = image;
      modalLocation.textContent = location;
      modalOrigin.textContent = origin;
      characterModal.style.display = "flex";
    }
  });

  // Close modal
  closeBtn.addEventListener("click", function () {
    characterModal.style.display = "none";
  });

  // Close modal when clicking outside of modal content
  window.addEventListener("click", function (event) {
    if (event.target === characterModal) {
      characterModal.style.display = "none";
    }
  });
});
