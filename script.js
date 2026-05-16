const form = document.getElementById("formDiario"), listaRegistros = document.getElementById("listaRegistros");
let diarios = JSON.parse(localStorage.getItem("diarios")) || [];

function renderizarDiarios() {
    listaRegistros.innerHTML = ""
    diarios.forEach((e, r) => {
        const t = document.createElement("li");
        t.innerHTML = `<div class="registro-header"><strong>${e.titulo}</strong><small>${e.data}</small><button class="btn-remover" onclick="removerDiario(${r})">Excluir</button></div><p>${e.descricao}</p>`
        listaRegistros.appendChild(t)
    })
}

function adicionarDiario(e) {
    e.preventDefault();
    const r = document.getElementById("titulo").value, t = document.getElementById("data").value, o = document.getElementById("descricao").value;
    diarios.push({ titulo: r, data: t, descricao: o })
    localStorage.setItem("diarios", JSON.stringify(diarios))
    renderizarDiarios()
    form.reset()
}

function removerDiario(e) {
    diarios.splice(e, 1)
    localStorage.setItem("diarios", JSON.stringify(diarios))
    renderizarDiarios()
}

form.addEventListener("submit", adicionarDiario)
renderizarDiarios();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js").then(e => console.log("sw registrado", e)).catch(e => console.log("Falha no SW:", e))
    })
}

let promptInstalacao;
const btnInstalar = document.getElementById("btnInstalar");

window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault()
    promptInstalacao = e
    btnInstalar.removeAttribute("hidden")
})
btnInstalar.addEventListener("click", async () => {
    if (promptInstalacao) {
        promptInstalacao.prompt();
        const { outcome: e } = await promptInstalacao.userChoice; console.log(`Escolha: ${e}`)
        promptInstalacao = null
        btnInstalar.setAttribute("hidden", "")
    }
});