// --- Persistência e UI ---
const form = document.getElementById('formDiario');
const listaRegistros = document.getElementById('listaRegistros');

// Carrega os dados do localStorage ou inicia um array vazio
let diarios = JSON.parse(localStorage.getItem('diarios')) || [];

function renderizarDiarios() {
    listaRegistros.innerHTML = '';
    diarios.forEach((diario, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="registro-header">
                <strong>${diario.titulo}</strong>
                <small>${diario.data}</small>
                <button class="btn-remover" onclick="removerDiario(${index})">Excluir</button>
            </div>
            <p>${diario.descricao}</p>
        `;
        listaRegistros.appendChild(li);
    });
}

function adicionarDiario(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;

    diarios.push({ titulo, data, descricao });
    localStorage.setItem('diarios', JSON.stringify(diarios));

    renderizarDiarios();
    form.reset();
}

function removerDiario(index) {
    diarios.splice(index, 1);
    localStorage.setItem('diarios', JSON.stringify(diarios));
    renderizarDiarios();
}

form.addEventListener('submit', adicionarDiario);
renderizarDiarios();

// --- PWA  ---
// 1. Registro do Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('sw registrado', reg))
            .catch(err => console.log('falha ao registrar o sw:', err));
    });
}

// 2. Instalação na Tela Inicial (beforeinstallprompt)
let promptInstalacao;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
    // Previne o mini-infobar de aparecer no mobile
    e.preventDefault();
    // Guarda o evento para ser disparado depois
    promptInstalacao = e;
    // Mostra o botão na nossa UI
    btnInstalar.removeAttribute('hidden');
});

btnInstalar.addEventListener('click', async () => {
    if (promptInstalacao) {
        // Mostra o prompt nativo de instalação
        promptInstalacao.prompt();
        // Aguarda o usuário responder ao prompt
        const { outcome } = await promptInstalacao.userChoice;
        console.log(`Escolha do usuário: ${outcome}`);
        // Limpa o prompt salvo, pois só pode ser usado uma vez
        promptInstalacao = null;
        // Esconde o botão novamente
        btnInstalar.setAttribute('hidden', '');
    }
});