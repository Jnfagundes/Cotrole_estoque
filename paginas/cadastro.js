document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Capturando os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    // Criando um objeto usuário
    const usuarioDados = {
        nome: nome,
        email: email,
        usuario: usuario,
        senha: senha
    };

    // Salvando os dados no localStorage
    localStorage.setItem(usuario, JSON.stringify(usuarioDados));

    // Mensagem de sucesso ou redirecionamento
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html'; // Redireciona para a página de login após o cadastro
});
