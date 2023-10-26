var searchInput = document.querySelector('.input')
var searchBtn = document.querySelector('.searchbtn')

// container for all definitions
var  answers = document.querySelector('.defenitions')


searchBtn.addEventListener('click', (e) => {
   e.preventDefault()
   getwords(searchInput.value)
})


/**
 * this function takes in the users input and gets words, definitions, and their parts of speech from a API
 * it then sends this data to structureDefinition function which later displays the data
 */
const getwords = async (word) => {
    try {
        var res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        var data = await res.json()
        console.log(data);
        structureDefinition(data)

    } catch (error) {
        // if no records found display the error message on the screen
        answers.replaceChildren();
        cantFindMeaning(word)
        console.log(error);
    }
}

/**
 * this function gets the recieves the data from the Dictionary API and
 * destructures it to get the relevent meaning and partof speach
 * it then passes the data in the displaydefinition function.
 */
const structureDefinition = (res) => {
    // .definition[0]
        if (res) {
            var def = res[0].meanings[0].definitions
            var value = searchInput.value
            var meaning = res[0].meanings
            var validMening = res[0].meanings[0].partOfSpeech+ ' /'+  res[0].meanings[1].partOfSpeech
                
            if (meaning.length > 1) {
                answers.replaceChildren();
                displaydefinition(value, validMening, def)
            };
                return
            }
            answers.replaceChildren();
            displaydefinition(value, res[0].meanings, def)
            return

}


/**
 * this function receves the word searched for, the part of speach and the definition :
 * - then passes this data in the html mark up.
 * - then inserts the mark up into the answers container.
 */
const displaydefinition = (word, partOfSpeech, def) => {
    console.log(word);

    const markUp = `
       <h2>${word}</h2>
         <p class='meaning'>${partOfSpeech}</p>

        <div class='definitionContainer'>
           <h1>Meaning</h1>
           <p class='define'>- ${def[0].definition}</p>
           <p class='define'>- ${def[1].definition}</p>
           <p class='define'>- ${def[2].definition}</p>
        </div>

    `

    answers.insertAdjacentHTML('afterbegin', markUp)
}


// ERROR MESSAGES

/**
 * this function renders a cant find meaning message if they are no records for the searched word
 */
const cantFindMeaning = (value) => {
    const markUp = `
     <div class='errorMessage'>
        <h3>cant find meaning for '${value}'</h3>
     </div>

 `
    answers.insertAdjacentHTML('afterbegin', markUp)
}