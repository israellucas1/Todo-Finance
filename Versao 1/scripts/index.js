function controllPageHash(hash) {
  if (hash == "#perfil") {
    console.log("Perfil")
  } else if (hash == "#mes") {
    console.log("Mes")
  } else if (hash == "#ano") {
    console.log("Ano")
  } else if (hash == "inicio") {
    window.location.hash = "inicio"
    console.log("Pagina inicial")
  } else {
    console.log("Pagina não encontrada")
  }
}

window.addEventListener("hashchange", () => {
  let hashPage = window.location.hash
  controllPageHash(hashPage)
})

controllPageHash("inicio")