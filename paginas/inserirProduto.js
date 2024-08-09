document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Captura os dados do formulário
    const item = document.getElementById('item').value;
    const codigo = document.getElementById('codigo').value;
    const classificar = document.getElementById('classificar');
    const tipo = document.getElementById('tipo');
    const quantidade = document.getElementById('quantidade');
    const data = document.getElementById('data');
    const descricao = document.getElementById('descricao').value;

    // Cria um objeto para o item
    const novoItem = {
        id: Date.now(), // Gera um ID único baseado no timestamp
        item: item,
        codigo: codigo,
        classificar: classificar,
        tipo: tipo,
        quantidade: quantidade,
        data: data,
        descricao: descricao
    };

    // Busca a lista existente de itens no localStorage
    let itens = JSON.parse(localStorage.getItem('itens')) || [];

    // Adiciona o novo item à lista
    itens.push(novoItem);

    // Salva a lista atualizada no localStorage
    localStorage.setItem('itens', JSON.stringify(itens));

    // Mensagem de sucesso
    alert('Item cadastrado com sucesso!');

    // Limpa o formulário
    document.getElementById('formCadastro').reset();
});
