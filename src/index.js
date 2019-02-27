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




// fetch data
async function data() {
  const response = await fetch('http://localhost:3000/toys')
  const jsonResponse = await response.json()
  return jsonResponse;
}

const postToy = (toy) => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
}

const patchLikes = (toyId, likes) => {
  return fetch(`http://localhost:3000/toys/${toyId}`,  {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(likes)
  })
  .then(resp => resp.json())
}


toyCollection.addEventListener('click', handlerLikesButton)


function handlerLikesButton(event) {
  // debugger
  if (event.target.classList.contains('like-btn')) {
    const toyId = event.target.dataset.id
    const pTag = event.target.parentNode.querySelector('p');
    let number = parseInt(pTag.textContent);
    let addedLikes = number + 1;

    const toyLikes = {
      likes: addedLikes
    }

    patchLikes(toyId, toyLikes).then(likes => {
      pTag.textContent = `${addedLikes} Likes`

    })
  }
}



const showPage = (toy) => {
 toy.map(renderDivCard).join('');
}




const renderDivCard = (toy) => {
  const divCard = document.createElement('div');
  divCard.className = "card";
  divCard.innerHTML = renderToyHTML(toy)
  toyCollection.append(divCard)
}


addToyForm.addEventListener('submit', handlerAddToy)




function handlerAddToy(event) {
    event.preventDefault()
    // debugger
      const toyName = event.target.name.value;
      const toyImage = event.target.image.value;

      const addToy = {
        name: toyName,
        image: toyImage,
        likes: 0
      }

      postToy(addToy).then(newToy => {
        // debugger
        toyCollection.innerHTML += `<div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} </p>
        <button class="like-btn">Like <3</button>
        </div>`
      })


}





const renderToyHTML = (toy) => {
  return (`
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p> ${toy.likes} Likes</p>
  <button data-id="${toy.id}" class="like-btn">Like <3</button>
  `)
}



showPage(allToys)





});
