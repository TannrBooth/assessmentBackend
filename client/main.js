const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const charContainer = document.getElementById("char-container")
const formSubmit = document.getElementById("add-form")

const baseURL = 'http://localhost:4000/api/characters'
const addForm = document.getElementById("add-form")
const pewkuObj = 'id=10&name=Pweku&element=Just a Crab&image=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1vwBa1Hc3mUPN14xDVNPqulgqEvftttCoA&usqp=CAU'

const charCallback = ({ data: characters }) => displayList(characters)
//I still don't fully understand the syntax of the { data: characters } object, but it seems to be pulling in the array data from the controller file

const errCallback = err => console.log(err)

const getAllChars = () => {
    axios.get(baseURL)
    .then(charCallback)
    .catch(errCallback)
}
const createChar = body => {
    axios.post(baseURL, body)
    .then(charCallback)
    .catch(errCallback)
}
const deleteChar = id => {
    axios.delete(`${baseURL}/${id}`)
    .then(charCallback)
    .catch(errCallback)
}

const changeName = id => {
    axios.put(`${baseURL}/${id}`)
    .then(charCallback)
    .catch(errCallback)
}

const submitHandler = (evt) => {
    evt.preventDefault()
    
    let bionicleName = document.querySelector("#bionicle-name")
    let bionicleElem = document.querySelector("#bionicle-element")
    let bionicleImg = document.querySelector("#bionicle-image")
    
    let bodyObj = {
        name: bionicleName.value,
        element: bionicleElem.value,
        image: bionicleImg.value
    }

    createChar(bodyObj)

    bionicleName.value = ''
    bionicleElem.value = ''
    bionicleImg.value = ''
}

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
        .catch(err => console.log(err))
}

const createCharacterCard = (char) => {
    const charCard = document.createElement('div')
    charCard.classList.add("char-card")
    charCard.innerHTML = `
        <img src=${char.image} />
        <p>Name: ${char.name}</p>
        <p>Element: ${char.element}</p>
        <button onclick="deleteChar(${char.id})">x</button>
        <button onclick="changeName(${char.id})">Pewku Button</button>`
    
    charContainer.appendChild(charCard)

}



const displayList = (arr) => {
    charContainer.innerHTML=``
    for (let i = 0; i < arr.length; i++) {
        createCharacterCard(arr[i])
    }
        
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click',getFortune)
formSubmit.addEventListener('submit', submitHandler)
getAllChars()


