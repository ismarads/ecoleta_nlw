function populateUFs(){

    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

    .then(res =>  res.json())// como se trata de apenas uma resposta a função anonima foi reduzida ao maximo, bem como a solicitação de retorno do json
    .then(states => {


        for(const state of states){

            ufSelect.innerHTML +=  `<option value = "${state.id}"> ${state.nome}</option>`
        }

       

    })

}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    
    const ufValue = event.target.value

    const indesOfSelectedState = event.target.selectedIndex
    stateInput.value=event.target.options[indesOfSelectedState].text


  

   
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)

    .then(res =>  res.json())// como se trata de apenas uma resposta a função anonima foi reduzida ao maximo, bem como a solicitação de retorno do json
    .then(cities => {
        
        for(const city of cities){

            citySelect.innerHTML +=  `<option value = "${city.nome}"> ${city.nome}</option>`
        }

       citySelect.disabled = false

    })


}

document
.querySelector("select[name=uf]")
.addEventListener( "change", getCities)


// ítmes de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li") // a variavel recebe os ítens listados no html

for(const item of itemsToCollect){ 
    item.addEventListener('click', handleSelectedItem) // adicionamos o ouvidor de eventos q no caso será um click e ja colocamos a função mesmo antes de criar


}
 // vamos criar a função handleSelectedItem agora


 const collectedItems = document.querySelectorAll(".items-grid li") //variável usada para atualizar o array de items ver linha 101  
 let selectedItems = [] //array pra receber os items selecionados é uma "let" pq os valores não serão constantes, se fossem seria uma const

 function handleSelectedItem(event){

    const itemLi = event.target

    // como adicionar ou remover uma classe com js  add=adiciona remove=remove e o toggle = adiciona ou remove de acordo com a intrução
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID:', itemId)   //**********testando****** */
//--------------------------------------------------------------------------------//
    // verificar se existem items selecionados, se sim , pega e lança no array

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })
//-----------------------------------------------------------------------//
    //se ja tiver selecionado, tira  da seleção

    if(alreadySelected >=0){

        //tira da seleção
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId // retorno falso pq não é diferente nesse momento
            return itemIsDifferent
        })

        selectedItems=filteredItems //atribuiu o item filtrado

    }else{
        //senão estiver selecionado coloca la no array

        selectedItems.push(itemId)

    }
    // console.log('selectedItems:', selectedItems)     /**********testando****** */
    //atualiza o campo escondido(hidden) com os itens selecionados
    collectedItems.value = selectedItems

 }