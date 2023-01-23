const BASE_URL = "https://jsonplaceholder.typicode.com/todos"

const userList = document.querySelector('.users')
const form = document.querySelector('#form')
const title = document.querySelector('.title').value
const users = []

const getData = async () => {
    const res = await fetch(BASE_URL)
    const data = await res.json()

    console.log(data);

    data.forEach(posts => {
        userList.appendChild(createList(posts))
        
    });
    
}

getData()

const createList = (data) => {
    const list = document.createElement('ul')
    list.classList.add('list')

    const title = document.createElement('li')
    title.innerText = 'Title: ' + data.title

    const status = document.createElement('p')
    status.classList.add('status')
    status.innerText = 'Completed: ' + data.completed

    const id = document.createElement('p')
    id.innerText = 'User: ' + data.userId

    list.appendChild(title)
    list.appendChild(status)
    list.appendChild(id)


    return list
}


