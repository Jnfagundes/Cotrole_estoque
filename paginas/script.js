
document.querySelector('form[action="tela_acesso.html"]').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Capturando os dados do formulário de login
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    // Buscando os dados no localStorage
    const usuarioDados = JSON.parse(localStorage.getItem(usuario));

    if (usuarioDados && usuarioDados.senha === senha) {
        alert('Login realizado com sucesso!');
        
        // Marcar o usuário como logado
        localStorage.setItem('usuarioLogado', usuario);
        
        // Redirecionar para a página restrita
        window.location.href = 'tela_acesso.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

//Verificando usuário
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('identificacao').textContent = usuarioLogado;
    }

    // Adicionar evento de logout
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });

    // Outros eventos, como o de consulta e inserção de itens, devem ser colocados aqui
});

//Verificação de usuário
document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('identificacao').textContent = usuarioLogado;
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });
});
