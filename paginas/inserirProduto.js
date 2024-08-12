

document.getElementById('iserindoItens').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o envio padrão do formulário

    // Capturar os dados do formulário
    const produto = {
        nome: document.getElementById('itemDescricao').value,
        codigo: document.getElementById('codigo').value,
        classificacao: document.getElementById('classificar').value,
        tipo: document.getElementById('tipo').value,
        quantidade: document.getElementById('quantidade').value,
        dataEntrada: document.getElementById('dataEntrada').value,
        descricao: document.getElementById('descricao').value
    };

    // Recuperar os produtos existentes do localStorage
    let produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];

    // Adicionar o novo produto ao array de produtos
    produtosEstoque.push(produto);

    // Salvar o array atualizado no localStorage
    localStorage.setItem('produtosEstoque', JSON.stringify(produtosEstoque));

    // Limpar o formulário após o cadastro
    document.getElementById('iserindoItens').reset();

    // Exibir uma mensagem de sucesso (opcional)
    alert('Produto cadastrado com sucesso!');
});


// Função para exibir os resultados da consulta
function exibirResultados(resultados) {
    const resultadoDiv = document.getElementById('resultadoConsulta');
    resultadoDiv.innerHTML = ''; // Limpar resultados anteriores

    if (resultados.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
    } else {
        const tabela = document.createElement('table');
        tabela.style.color = 'white';
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th>Nome do Item</th>
                    <th>Código</th>
                    <th>Classificação</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Data de Inclusão</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

        const tbody = tabela.querySelector('tbody');
        resultados.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.codigo}</td>
                <td>${produto.classificacao}</td>
                <td>${produto.tipo}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.dataEntrada}</td>
                <td>${produto.descricao}</td>
            `;
            tbody.appendChild(row);
        });

        resultadoDiv.appendChild(tabela);
    }
}
