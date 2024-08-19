document.getElementById('btnEnvio').querySelector('button:nth-child(2)').addEventListener('click', function() {
    // Preencher automaticamente o campo de data com a data atual
    const campoDataSolicitacao = document.getElementById('dataSolicitacao');
    campoDataSolicitacao.value = obterDataHoraAtual();

    // Obter os valores dos campos
    const solicitanteElement = document.getElementById('Solicitante');
    const codigoProdutoElement = document.getElementById('codProdutSolicitado');
    const quantidadeSolicitadaElement = document.getElementById('quantidadeSolicitacao');
    
    const solicitante = solicitanteElement ? solicitanteElement.value.trim() : '';
    const codigoProduto = codigoProdutoElement ? codigoProdutoElement.value.trim() : '';
    const dataSolicitacao = campoDataSolicitacao ? campoDataSolicitacao.value.trim() : '';
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
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Código do Produto</th>
                <th>Nome do Produto</th>
                <th>Descrição</th>
                <th>Quantidade Solicitada</th>
                <th>Data e horário da Solicitação</th>
                <th>Solicitante</th>
            </tr>
        `;
        tabela.appendChild(thead);
        tabela.appendChild(document.createElement('tbody'));
        tabelaRelatorioDiv.appendChild(tabela);
    }

    // Adicionar uma nova linha à tabela
    const tbody = tabela.querySelector('tbody');
    const novaLinha = document.createElement('tr');

    const campos = [
        produto.codigo || 'N/A',
        produto.nome || 'N/A',
        produto.descricao || 'N/A',
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
    const formulario = document.getElementById('formulario');
    if (formulario) {
        formulario.reset();
    }
    
    alert('Solicitação criada com sucesso!');
});

// Função para obter a data e hora no formato desejado
function obterDataHoraAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    return `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;
}

// Função para atualizar a data e hora a cada segundo
function atualizarDataHora() {
    const dataHoraAtualDiv = document.getElementById('dataHoraSistema');
    dataHoraAtualDiv.textContent = `Data e Hora: ${obterDataHoraAtual()}`;
}

// Atualiza a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);

// Preenche a div com a data e hora atual quando a página carrega
document.addEventListener('DOMContentLoaded', atualizarDataHora);

document.getElementById('paraExcel').addEventListener('click', function() {
    const dados = [];

    // Selecionar o cabeçalho da tabela
    const cabecalhos = document.querySelectorAll('#tabelaRelatorio table thead tr th');
    const linhaCabecalho = Array.from(cabecalhos).map(th => th.textContent);
    dados.push(linhaCabecalho);

    // Selecionar todas as linhas da tabela
    const linhas = document.querySelectorAll('#tabelaRelatorio table tbody tr');
    linhas.forEach(linha => {
        const valores = Array.from(linha.children).map(td => td.textContent);
        dados.push(valores);
    });

    // Criar um workbook (planilha)
    const workbook = XLSX.utils.book_new();

    // Criar uma planilha
    const worksheet = XLSX.utils.aoa_to_sheet(dados);

    // Adicionar a planilha ao workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

    // Gerar o arquivo Excel
    XLSX.writeFile(workbook, "dados.xlsx");
});
