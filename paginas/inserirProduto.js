

document.getElementById('iserindoItens').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o envio padrão do formulário

    // Capturar os dados do formulário
    const produto = {
        nome: document.getElementById('itemDescricao').value,
        codigo: document.getElementById('codigo').value,
        classificacao: document.getElementById('classificarItem').value, // ID corrigido
        tipo: document.getElementById('tipoItem').value, // ID corrigido
        quantidade: document.getElementById('quantidadeItem').value, // ID corrigido
        dataEntrada: document.getElementById('dataEntradaItem').value, // ID corrigido
        descricao: document.getElementById('descricaoItem').value // ID corrigido
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

// Carregar produtos do localStorage e exibir
document.addEventListener('DOMContentLoaded', function() {
    const produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];
    exibirResultados(produtosEstoque);
});



// Função para exibir os resultados da consulta
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar produtos do localStorage
    const produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];

    // Exibir resultados iniciais (se houver)
    exibirResultados(produtosEstoque);
    
    // Adicionar evento de submit ao formulário de consulta
    document.getElementById('consultaItens').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir o envio padrão do formulário

        // Captura o valor da consulta
        const query = document.getElementById('consultaDescricao').value.toLowerCase().trim();
        
        // Filtrar produtos que correspondem à consulta
        const produtosFiltrados = produtosEstoque.filter(produto => 
            produto.nome.toLowerCase().includes(query) || 
            produto.codigo.toLowerCase().includes(query)
        );

        // Exibir os resultados filtrados
        exibirResultados(produtosFiltrados);
    });
});

function exibirResultados(resultados) {
    console.log('Exibindo resultados:', resultados);

    const resultadoDiv = document.getElementById('resultadoConsulta');
    resultadoDiv.innerHTML = ''; // Limpar resultados anteriores

    if (!Array.isArray(resultados) || resultados.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
        resultadoDiv.style.display = 'none'; // Oculta o div se não houver dados
        return;
    }

    const tabela = document.createElement('table');
    tabela.classList.add('tabela-produtos');

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
        const nomeTd = document.createElement('td');
        nomeTd.textContent = produto.nome || 'N/A';
        row.appendChild(nomeTd);

        const codigoTd = document.createElement('td');
        codigoTd.textContent = produto.codigo || 'N/A';
        row.appendChild(codigoTd);

        const classificacaoTd = document.createElement('td');
        classificacaoTd.textContent = produto.classificacao || 'N/A';
        row.appendChild(classificacaoTd);

        const tipoTd = document.createElement('td');
        tipoTd.textContent = produto.tipo || 'N/A';
        row.appendChild(tipoTd);

        const quantidadeTd = document.createElement('td');
        quantidadeTd.textContent = produto.quantidade || 'N/A';
        row.appendChild(quantidadeTd);

        const dataTd = document.createElement('td');
        dataTd.textContent = produto.dataEntrada || 'N/A';
        row.appendChild(dataTd);

        const descricaoTd = document.createElement('td');
        descricaoTd.textContent = produto.descricao || 'N/A';
        row.appendChild(descricaoTd);

        tbody.appendChild(row);
    });

    resultadoDiv.appendChild(tabela);
    resultadoDiv.style.display = 'block'; // Exibe o div quando houver dados
}
