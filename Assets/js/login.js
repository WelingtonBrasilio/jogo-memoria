// Variaveis para input e buttao do form
const input = document.querySelector('.input-login')
const button = document.querySelector('.botao-login')
const form = document.querySelector('.form-login')

// Valida se o usuario digitou o nickname compativel
function validarInput({target}){
    if(target.value.length > 3) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled' , '')
    }
}

// Salva o nickname no navegador quando disparar o enter/submit
function enterSubmit(event){
    event.preventDefault()
    localStorage.setItem('nickname', input.value)
    window.location = 'game.html'
}

// Executa a função quando selecionado
input.addEventListener('input' , validarInput)
form.addEventListener('submit' , enterSubmit)

