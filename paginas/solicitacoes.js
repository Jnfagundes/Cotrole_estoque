document.getElementById('btnEnvio').querySelector('button:nth-child(2)').addEventListener('click', function() {
    // Obter os valores dos campos
    const solicitanteElement = document.getElementById('Solicitante');
    const codigoProdutoElement = document.getElementById('codProdutSolicitado');
    const dataSolicitacaoElement = document.getElementById('dataSolicitacao');
    const quantidadeSolicitadaElement = document.getElementById('quantidadeSolicitacao');
    
    const solicitante = solicitanteElement ? solicitanteElement.value.trim() : '';
    const codigoProduto = codigoProdutoElement ? codigoProdutoElement.value.trim() : '';
    const dataSolicitacao = dataSolicitacaoElement ? dataSolicitacaoElement.value.trim() : '';
    const quantidadeSolicitada = quantidadeSolicitadaElement ? quantidadeSolicitadaElement.value.trim() : '';

    // Verificar se todos os campos foram preenchidos
    if (!solicitante || !codigoProduto || !dataSolicitacao || !quantidadeSolicitada) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Recuperar os produtos existentes do localStorage
    const produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];

    // Buscar o produto pelo código
    const produto = produtosEstoque.find(produto => produto.codigo === codigoProduto);

    if (!produto) {
        alert('Produto não encontrado.');
        return;
    }

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

    const campos = [
        produto.nome || 'N/A',
        produto.descricao || 'N/A',
        produto.codigo || 'N/A',
        quantidadeSolicitada || 'N/A',
        dataSolicitacao || 'N/A',
        solicitante || 'N/A'
    ];

    campos.forEach(valor => {
        const td = document.createElement('td');
        td.textContent = valor;
        novaLinha.appendChild(td);
    });

    tbody.appendChild(novaLinha);

    // Limpar o formulário após gerar a solicitação
    if (document.getElementById('formulario')) {
        document.getElementById('formulario').reset();
        
    }
    
    
    alert('Solicitação criada com sucesso!');
    
});

// Função para obter a data no formato desejado
function obterDataAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Meses são indexados a partir de 0
    const dia = String(agora.getDate()).padStart(2, '0');
    return `${dia}-${mes}-${ano}`;
}

// Preenche o campo com a data atual
document.addEventListener('DOMContentLoaded', () => {
    const campoDataSolicitacao = document.getElementById('dataSolicitacao');
    campoDataSolicitacao.value = obterDataAtual();
});

