let bionicleList = [
    {
        name: "Tahu",
        element: "fire",
        image: "https://img.bricklink.com/ItemImage/SL/8534-1.png"
    },
    {
        name: "Lewa",
        element: "Air",
        image: "https://img.bricklink.com/ItemImage/SN/0/8535-1.png"
    },
    {
        name: "Onua",
        element: "Earth",
        image: "https://img.bricklink.com/ItemImage/SN/0/8532-1.png"
    }
]

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ["A sexy person will look at you and double-take", "I see realy potential for your hairstyle", "Don't forget to lock your bedroom door tonight. Not just your front door, your bedroom door also. Trust me", "Act on the next intrusive thought that enters your head", "Text your ex. You won't."];

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune);
    },
    displayList: (req,res) => {
        res.status(200).send(bionicleList)
    },
    createChar: (req,res) => {
        let newChar = {...req.body}
        bionicleList.unshift(newChar)
    },
    deleteChar: (req,res) => {
        let { name } = req.params
        let index = bionicleList.findIndex(char => char.name === name)
        bionicleList.splice(index,1)
        res.status(200).send(bionicleList)
    }

}