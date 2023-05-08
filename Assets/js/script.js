//Seleciona a class de exibição
const tela = document.querySelector('.tela')

//Seleciona a classe do player
const player = document.querySelector('.player')

//Seleciona a classe tempo
const tempo = document.querySelector('.tempo')

//Array com os personagens a serem exibidos nos cards
const personagens = [
    'angry', 'broom', 'castle-house', 'coffin', 'ghost', 'halloween', 'pumpkin', 'raven', 'skull', 'voodoo-doll'
]

//Função que cria elementos 
function criarElement(tag, className){
    const element = document.createElement(tag)
    element.className = className
    return element
}

//Variaveis para funcionalidade do jogo
let primeiroCard = ''
let segundoCard = ''

//Verifica se o jogo acabou
function fimDeJogo(){
    const cardsDesabilitados = document.querySelectorAll('.desabilita-card')

    if(cardsDesabilitados.length == 20){
        clearInterval(this.loop)
        alert(`Parabéns, ${player.innerHTML}! Seu tempo foi: ${tempo.innerHTML} segundos!`)
    }
}

//Função que checa se os cards são iguais
function checaCards(){
    const primeiroPersonagem = primeiroCard.getAttribute('data-personagem')
    const segundoPersonagem = segundoCard.getAttribute('data-personagem')

    if(primeiroPersonagem == segundoPersonagem){
        primeiroCard.firstChild.classList.add('desabilita-card')
        segundoCard.firstChild.classList.add('desabilita-card')

        primeiroCard = ''
        segundoCard = ''

        fimDeJogo()

    }else{
        
        setTimeout(() => {
            primeiroCard.classList.remove('revela-card')
            segundoCard.classList.remove('revela-card')

            primeiroCard = ''
            segundoCard = ''
        }, 500)
        
    }
}

//Função que gira o card quando clicado
function revelaCard({target}){
    //Caso o card selecionado tenha a class informada, não acontece mais nada
    if(target.parentNode.className.includes('revela-card')){
        return
    }

    if(primeiroCard === ''){
        target.parentNode.classList.add('revela-card')
        primeiroCard = target.parentNode
    }else if(segundoCard === ''){
        target.parentNode.classList.add('revela-card')
        segundoCard = target.parentNode

        checaCards()
    }

    /*Define que a seleção deve ser  do elemento pai do elemento clicado
    target.parentNode.classList.add('revela-card')*/
}

//Função que cria cards randomicos
function criarCard(personagem){
    //Variaveis de criação de elemento html, que requerem tag e class
    const card = criarElement('div', 'card')
    const frente = criarElement('div', 'verso frente')
    const costa = criarElement('div', 'verso costa')

    frente.style.backgroundImage = `url(../Assets/img/${personagem}.png)`

    //Define os "filhos" da div card
    card.appendChild(frente)
    card.appendChild(costa)

    //Revela carta quando clicada e define atributo para comparação
    card.addEventListener('click', revelaCard)
    card.setAttribute('data-personagem', personagem)

    return card
}

//Gerador do jogo
function carregaJogo(){
    //Duplica personagem, espalhando os elementos do array base no novo
    const duplicaPersonagens = [...personagens, ...personagens]

    const embaralhaPersonagens = duplicaPersonagens.sort(() => Math.random() - 0.5)

    embaralhaPersonagens.forEach(function(personagem){
        const card = criarCard(personagem)
        tela.appendChild(card)
    })
}

//Inicia o cronometro de tempo jogado
function iniciaTempo() {

    this.loop = setInterval(function(){
        const tempoAtual = +tempo.innerHTML
        tempo.innerHTML = tempoAtual + 1
    }, 1000)
}

//Carrega os elementos quando a pagina está pronta
window.onload = function(){
    //recupera o valor do storage
    player.innerHTML = localStorage.getItem('nickname')
    iniciaTempo()

    carregaJogo()
}
