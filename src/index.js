const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.getElementById('toy-collection')
const toyName = document.getElementById('toy-name')
const toyImage = document.getElementById('toy-image')
const toySubmit = document.getElementById('toy-submit')

let addToy = false

const state = {
  toys: []
}

const renderToy = toy => {
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img class="toy-avatar" src="${toy.image}" />
    <p data-id='${toy.id}'>${toy.likes} likes</p>
    <div class='like-btn'>
    <button data-id='${toy.id}' class='heart'>&hearts;</button>
    </div>
  `
  toyContainer.appendChild(toyCard)
}

const renderToys = toys => 
  toys.forEach(toy => renderToy(toy)) 


getToys()
  .then(toys => {
    state.toys = toys
    renderToys(toys)
  })

  // Click submit to trigger toy creation
  toySubmit.addEventListener('click', event => {
    event.preventDefault()
    const newToy = {
      name: toyName.value,
      image: toyImage.value,
      likes: 0
    }
    createToy(newToy)
      .then(toy => renderToy(toy))
  })



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

const findToy = id => 
  state.toys.find(toy => toy.id === parseInt(id))

const incrementLikes = toy => {
  const likesContainer = document.querySelector(`p[data-id='${toy.id}']`)
  toy.likes += 1
  likesContainer.innerText = `${toy.likes} likes`
  return toy
}

const animateLike = event => {
  event.target.classList.add('is_animating');
  setTimeout(() => {
    event.target.classList.remove('is_animating');
  }, 800)
}

document.addEventListener('click', event => {
  if (event.target.classList.contains('heart')) {
    const id = event.target.dataset.id
    const foundToy = findToy(id)
    const likedToy = incrementLikes(foundToy)
    animateLike(event)
    updateToy(likedToy)
  }
})


