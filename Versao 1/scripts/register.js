const displayList = document.querySelector("#display"),
  tbody = document.querySelector("#tbody"),
  formActive = document.querySelector("#formActive"),
  formRegister = document.querySelector("#formRegister")
var database = localStorage.getItem("database")
var dados = [{ user: { nome: "", salario: "", nascimento: "" }, gastos: [] }]

const Utils = {
  createId() {
    let quant = dados[0].gastos.length + 1
    return quant
  },
  createFullDate(data) {
    let d = (data.getDate() + 1).toString().padStart(2, "0")
    let m = (data.getMonth() + 1).toString().padStart(2, "0")
    let a = data.getFullYear()
    let h = data.getHours().toString().padStart(2, "0")
    let min = data.getMinutes().toString().padStart(2, "0")
    let s = data.getSeconds().toString().padStart(2, "0")
    return d + "/" + m + "/" + a + " " + h + ":" + min + ":" + s
  },
  createDate(day) {
    let data = new Date(day)
    let d = (data.getDate() + 1).toString().padStart(2, "0")
    let m = (data.getMonth() + 1).toString().padStart(2, "0")
    let a = data.getFullYear()
    return d + "/" + m + "/" + a
  }
}

if (database == null) {
  localStorage.setItem("database", JSON.stringify(dados))
} else {
  dados = JSON.parse(database)
}

const Types = {
  typesExpense: ["Despesa", "Extra adcional"]
}

function setData(dt) {
  dados[0].gastos.push(dt)
  localStorage.setItem("database", JSON.stringify(dados))
}

function listGastos(list) {
  if (list.length === 0) {
    displayList.innerHTML = "<p class='mensagem'>Sem registros</p>"
  } else {
    tbody.innerHTML = ""
    list.forEach(e => {
      tbody.insertAdjacentHTML("afterbegin", `
        <tr>
          <td>Marcar</td>
          <td>despesa</td>
          <td>${e.description}</td>
          <td>${e.value}</td>
          <td>${e.dateMonth}</td>
          <td>Status</td>
          <td>Lembrete</td>
          <td>Excluir</td>
          <td>Alterar</td>
        </tr>
      `)
    })
  }
}

class Expenses {
  id = Utils.createId()
  dateCreated = Utils.createFullDate(new Date)
  dateUpdated
  dateMonth
  description
  value
  type
  paidOut
  constructor(description, value, dateMonth) {
    this.description = description
    this.value = value
    this.dateMonth = dateMonth
  }
}

formActive.addEventListener("click", () => {
  formRegister.classList.toggle("ativo")
})

formRegister.addEventListener("submit", (e) => {
  e.preventDefault()
  let description = document.querySelector("#descricao").value
  let valor = document.querySelector("#valor").value
  let data = document.querySelector("#data").value
  let novoGasto = new Expenses(description, valor, Utils.createDate(data))
  setData(novoGasto)
  listGastos(dados[0].gastos)
})

listGastos(dados[0].gastos)