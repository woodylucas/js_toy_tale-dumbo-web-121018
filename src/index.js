document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM fully loaded and parsed");

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection');
const allToys = await data();
const addToyForm = document.querySelector('.add-toy-form')
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

// creating likes


toyCollection.addEventListener('click', getTheseLikes)

function getTheseLikes(toy) {

  // debugger
  const toyButton = event.target.classList.contains('like-btn');
  const toyId = event.target.dataset.toyid
  const p = event.target.parentNode.querySelector('p');
  let num = parseInt(p.innerText)
  let addedLikes = num + 1
  p.innerText = `${addedLikes} Likes`



  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      "likes": addedLikes
    }),
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    })
  .then(r => r.json())
  .then()



}






// render each Toy
function renderEachToy(toys){
  toys.forEach(toyHTML)
}

function renderNewToy(toy){
  let toyCard = document.createElement('div')
  toyCard.innerHTML += toyHTML(toy)
}

function toyHTML(toy) {
  const toyCard = document.createElement('div')
  toyCard.className = "card";
  // console.log(toyCard)

  toyCard.innerHTML = (`<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button data-toyId="${toy.id}" class="like-btn">Like <3</button>`)
    toyCollection.appendChild(toyCard);
}


// creating a new toy
addToyForm.addEventListener('submit', addNewToy);

function addNewToy(e) {
  e.preventDefault()
  // debugger
  const toyName = event.target.querySelectorAll('input')[0].value;
  const toyUrl = event.target.querySelectorAll('input')[1].value;
  const newToy = {
    name: toyName,
    image: toyUrl,
    likes: 0
  }

  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)

  }).then(r => r.json())
  .then(data => renderNewToy(data))

}




// fetch data
async function data() {
  const response = await fetch('http://localhost:3000/toys')
  const jsonResponse = await response.json()
  return jsonResponse;
}



renderEachToy(allToys);







});
