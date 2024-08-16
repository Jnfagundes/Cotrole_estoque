document.getElementById('btnEnvio').querySelector('button:nth-child(2)').addEventListener('click', function() {
    const solicitante = document.getElementById('Solicitante').value.trim();
    const codigoProduto = document.getElementById('codProdutSolicitado').value.trim();
    const dataSolicitacao = document.getElementById('dataSolicitacao').value.trim();
    const quantidadeSolicitada = document.getElementById('numSolicitacao').value.trim();

    // Recuperar os produtos existentes do localStorage
    const produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];

    // Buscar o produto pelo código
    const produto = produtosEstoque.find(produto => produto.codigo === codigoProduto);

    if (produto && solicitante && dataSolicitacao && quantidadeSolicitada) {
        // Criar ou atualizar a tabela dinamicamente
        const tabelaRelatorioDiv = document.getElementById('tabelaRelatorio');
        let tabela = tabelaRelatorioDiv.querySelector('table');

        if (!tabela) {
            // Se a tabela não existir, criar uma nova
            tabela = document.createElement('table');
            tabela.innerHTML = `
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Descrição</th>
                        <th>Código do Produto</th>
                        <th>Quantidade Solicitada</th>
                        <th>Data da Solicitação</th>
                        <th>Solicitante</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            tabelaRelatorioDiv.appendChild(tabela);
        }

        // Adicionar uma nova linha à tabela
        const tbody = tabela.querySelector('tbody');
        const novaLinha = document.createElement('tr');

        const nomeTd = document.createElement('td');
        nomeTd.textContent = produto.nome || 'N/A';
        novaLinha.appendChild(nomeTd);

        const descricaoTd = document.createElement('td');
        descricaoTd.textContent = produto.descricao || 'N/A';
        novaLinha.appendChild(descricaoTd);

        const codigoTd = document.createElement('td');
        codigoTd.textContent = produto.codigo || 'N/A';
        novaLinha.appendChild(codigoTd);

        const quantidadeTd = document.createElement('td');
        quantidadeTd.textContent = quantidadeSolicitada || 'N/A';
        novaLinha.appendChild(quantidadeTd);

        const dataTd = document.createElement('td');
        dataTd.textContent = dataSolicitacao || 'N/A';
        novaLinha.appendChild(dataTd);

        const solicitanteTd = document.createElement('td');
        solicitanteTd.textContent = solicitante || 'N/A';
        novaLinha.appendChild(solicitanteTd);

        tbody.appendChild(novaLinha);

        // Limpar o formulário após gerar a solicitação
        document.getElementById('formulario').reset();
        alert('Solicitação criada com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos e verifique se o produto foi encontrado.');
    }
});

