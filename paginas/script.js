
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
