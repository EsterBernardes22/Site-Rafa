const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sEmail = document.querySelector('#m-email')
const sNome = document.querySelector('#m-nome')
const sTurma = document.querySelector('#m-turma')
const sNivel = document.querySelector('#m-nivel')
const sProgresso = document.querySelector('#m-progresso')
const sAcesso = document.querySelector('#m-acesso')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sEmail.value = itens[index].email
    sNome.value = itens[index].nome
    sTurma.value = itens[index].turma
    sNivel.value = itens[index].nivel
    sProgresso.value = itens[index].progresso
    sAcesso.value = itens[index].acesso
    id = index
  } else {
    sEmail.value = ''
    sNome.value = ''
    sTurma.value = ''
    sNivel.value = ''
    sProgresso.value = ''
    sAcesso.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.email}</td>
    <td>${item.nome}</td>
    <td>${item.turma}</td>
    <td>${item.nivel}</td>
    <td>${item.progresso}</td>
    <td>${item.acesso}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sEmail.value == '' || sNome.value == '' || sTurma.value == '' || sNivel.value == '' || sProgresso.value == '' || sAcesso.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].email = sEmail.value
    itens[id].nome = sNome.value
    itens[id].turma = sTurma.value
    itens[id].nivel = sNivel.value
    itens[id].progresso = sProgresso.value
    itens[id].acesso = sAcesso.value
  } else {
    itens.push({'email': sEmail.value, 'nome': sNome.value, 'turma': sTurma.value, 'nivel': sNivel.value, 'progresso': sProgresso.value, 'acesso': sAcesso.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
