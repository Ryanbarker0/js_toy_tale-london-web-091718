const getToys = () =>
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())

const getToy = id =>
    fetch(`http://localhost:3000/toys/${id}`)
    .then(resp => resp.json())

const createToy = newToy =>
    fetch(`http://localhost:3000/toys`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newToy)
    }).then(resp => resp.json())

const updateToy = toy =>
    fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(toy)
    }).then(resp => resp.json())