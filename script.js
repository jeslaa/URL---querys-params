const BASE_URL = "https://jsonplaceholder.typicode.com/todos/"

const usersAr = []
const userList = document.querySelector('.users')
const form = document.querySelector('#inputForm')
const title = document.querySelector('#title')
const message = document.querySelector('.message')

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

    list.appendChild(title)
    list.appendChild(status)


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

const checkSubmit = e => {
    e.preventDefault()
    //validerar inputen
    if(title.value === ''){
        message.innerHTML = 'Detta fält kan inte vara tomt'

    }

    else if (title.value != ''){
        message.innerHTML = ''
        const addUser = {
            userId: 11,
            completed:  false,
            title: document.querySelector('#title').value
            
        }
        //Skickar datan till databasen och den nya datan skrivs ut på domen med den gamla
        fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(addUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            usersAr.push(data)
            const newUser = createList(data)
            userList.appendChild(newUser)
            console.log(usersAr);
        })
    }

    
    
}



userList.addEventListener('click', deleteUser)
form.addEventListener('submit', checkSubmit)



