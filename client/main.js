const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const charContainer = document.getElementById("char-container")
const formSubmit = document.getElementById("add-form-submit")
const bionicleName = document.getElementById("bionicle-name")
const bionicleElem = document.getElementById("bionicle-element")
const bionicleImg = document.getElementById("bionicle-image")
const displayAll = document.getElementById("display-list")
const addForm = document.getElementById("add-form")
const deleteBtn = document.querySelectorAll(".delete")



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
    let charCard = document.createElement('div')
    charCard.classList.add("char-card")
    charCard.innerHTML = `
        <img src=${char.image} />
        <p>Name: ${char.name}</p>
        <p>Element: ${char.element}</p>
        <button class="delete">x</button>`
    console.log(charCard)
    charContainer.appendChild(charCard)

}

const addChar = (evt) => {
    evt.preventDefault()
    
    let body = {
        name: bionicleName.value,
        element: bionicleElem.value,
        image: bionicleImg.value
    }
    
    axios.post('http://localhost:4000/api/addchar',body)
    .then((res)=>{
        res.data.forEach((charObj)=>{
            createCharacterCard(charObj)
        })
    })
    .catch((err)=>console.log(err))
    addForm.reset()


    
}

const clearBionicleList = () => {
    charContainer.innerHTML = ''
}

const deleteChar = (name) => {
    axios.delete(`/api/character/${name}`)
        .then(res => console.log(res.data))
        .catch((err) => {console.log(err)})
}

const displayList = (evt) => {
    evt.preventDefault()
    clearBionicleList()

    axios.get("http://localhost:4000/api/characters/")
        .then((res) => {
            res.data.forEach((char) => {
                createCharacterCard(char)
            })
        })
        .catch((err)=> console.log(err))
        
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click',getFortune)
formSubmit.addEventListener('click',addChar)
displayAll.addEventListener('click',displayList)
deleteBtn.addEvenListener('click',deleteChar)


