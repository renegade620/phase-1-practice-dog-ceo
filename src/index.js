// URLs for the fetch requests
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Ensures the subsequent code is only run after the DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    fetchImages();
    fetchBreeds();
    console.log('%c HI', 'color: firebrick');
});

function fetchImages() {
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => renderImages(data.message))
        .catch(error => console.error("Error fetching images:", error));
}

function renderImages(images) {
    const dogImageContainer = document.getElementById("dog-image-container");
    dogImageContainer.innerHTML = ""; // clears existing images
    images.forEach(imageURL => {
        const img = document.createElement("img");
        img.src = imageURL;
        dogImageContainer.appendChild(img);
    });
}

function fetchBreeds() {
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            renderBreeds(breeds);
            addBreedSelectListener(breeds);
        })
        .catch(error => console.error("Error fetching breeds:", error));
}

function renderBreeds(breeds) {
    const ul = document.getElementById("dog-breeds");
    ul.innerHTML = ""; // Clear existing breeds
    breeds.forEach(breed => {
        const li = document.createElement("li");
        li.textContent = breed;
        li.addEventListener("click", () => {
            li.style.color = "blue";
        });
        ul.appendChild(li);
    });
}

function addBreedSelectListener(breeds) {
    const breedDropdown = document.getElementById("breed-dropdown");
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });
}