const BASE_URL = "https://jsonplaceholder.typicode.com/todos/"

const usersAr = []
const userList = document.querySelector('.users')
const form = document.querySelector('#form')

//hämtar all data
const getData = async () => {
    const res = await fetch(BASE_URL)
    const data = await res.json()

    console.log(data);

    //Loopar igenom datan och sparar den i usersAr
    data.forEach(posts => {
        usersAr.push(posts)
        userList.appendChild(createList(posts))
        
    });
    
}

getData()

//Skapar html element och skriver ut datan till DOM
const createList = (data) => {
    const list = document.createElement('div')
    list.id = data.id
    list.classList.add('user')

    const title = document.createElement('p')
    title.innerText = 'Title: ' + data.title

    const status = document.createElement('p')
    status.classList.add('status')
    status.innerText = 'Completed: ' + data.completed

    // const id = document.createElement('p')
    // id.innerText = 'User: ' + data.userId

    list.appendChild(title)
    list.appendChild(status)
    // list.appendChild(id)


    return list
}

//Delete function
const deleteUser = e =>{
    if(!e.target.classList.contains('user')){
        console.log('Ingen div');
        return
    }
    
    fetch(BASE_URL + e.target.id, {
        method: 'DELETE'
    })
    .then(res => {
        console.log(res);
        if(res.ok){
            e.target.remove()
            const index = usersAr.findIndex(posts => posts.id == e.target.id)
            usersAr.splice(index, 1)
            console.log(usersAr);
        }
        console.log(e.target.id);
    })
}



userList.addEventListener('click', deleteUser)



