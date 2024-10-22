// index.js
const ramenMenu = document.getElementById("ramen-menu");
const ramenImage = document.querySelector(".detail-image");
const ramenName = document.querySelector(".name");
const restaurant = document.querySelector(".restaurant");
const rating = document.querySelector("#rating-display");
const comment = document.querySelector("#comment-display");
const form = document.querySelector("#new-ramen");


// inputs
const nameInput = document.querySelector("#new-name");
const restaurantInput = document.querySelector("#new-restaurant");
const imageInput = document.querySelector("#new-image");
const ratingInput = document.querySelector("#new-rating");
const commentInput = document.querySelector("#new-comment");


// Callbacks
const handleClick = (ramen) => {
 // Add code
 ramenImage.src = ramen.image;
 ramenName.textContent = ramen.name;
 restaurant.textContent = ramen.restaurant;
 rating.textContent = ramen.rating;
 comment.textContent = ramen.comment;
};


const addSubmitListener = (e) => {
 e.preventDefault();


 const newRamen = {
   name: nameInput.value,
   restaurant: restaurantInput.value,
   image: imageInput.value,
   rating: ratingInput.value,
   comment: commentInput.value,
 };


 fetch("http://localhost:3000/ramens", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(newRamen),
 })
   .then((res) => res.json())
   .then((data) => {
     const img = document.createElement("img");
     img.src = data.image;
     ramenMenu.appendChild(img);


     img.addEventListener("click", () => handleClick(data));
   })
   .catch((error) => console.error("Error:", error));
};


const displayRamens = () => {
 fetch("http://localhost:3000/ramens")
   .then((res) => res.json())
   .then((data) => {
     data.forEach((ramen) => {
       const img = document.createElement("img");
       img.src = ramen.image;
       ramenMenu.appendChild(img);
       img.addEventListener("click", () => handleClick(ramen));
     });
   });
};


const main = () => {
 form.addEventListener("submit", addSubmitListener);
 displayRamens();
};


main();


// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };


