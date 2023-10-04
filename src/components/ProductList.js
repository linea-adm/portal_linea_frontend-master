import React from 'react';


const ProductList = ({ products, onTotalDisponivelChange }) => {
  // Variáveis para armazenar os totais das colunas
  let totalSaldo = 0;
  let totalEmpenho = 0;
  let totalQAClass = 0;
  let totalDisponivel = 0;

  // Loop pelos produtos para calcular os totais das colunas
  products.forEach((product) => {
    totalSaldo += product.Saldo;
    totalEmpenho += product.Empenho;
    totalQAClass += product.QAClass;
    totalDisponivel += product.Disponivel;
  });
  onTotalDisponivelChange(totalDisponivel);
  // Função auxiliar para formatar valores em quantidade
  const formatNumber = (number) => {
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <tbody>     
      <tr>
        <th id="titletab" colSpan="6" style={{ backgroundColor: "#e6e8ef" }}>Análise de Produto/Estoque</th>
      </tr>
      <tr>
        <th>Filial</th>
        <th>Saldo</th>
        <th>Empenho</th>
        <th>QAClass</th>
        <th>E. Prev.</th>
        <th>Disponivel</th>
      </tr>
      
      {products.length === 0 ? (
        <tr>
          <td colSpan="6" className="text-center">Nenhum dado disponível para este produto.</td>
        </tr>
      ) : (
      products.map((product, index) => {
        return (
          <tr key={index}>
            <td>{formatNumber(product.Filial)}</td>
            <td>{formatNumber(product.Saldo)}</td>
            <td>{formatNumber(product.Empenho)}</td>
            <td>{formatNumber(product.QAClass)}</td>
            <td>
              {/* {formatNumber(product.EntradaPrevista)} */}
              </td>
            <td>{formatNumber(product.Disponivel)}</td>
          </tr>
        );
      })
      )}
      <tr className="total-row">
        <td>Total:</td>
        <td>{formatNumber(totalSaldo)}</td>
        <td>{formatNumber(totalEmpenho)}</td>
        <td>{formatNumber(totalQAClass)}</td>
              <td>
                {/* {formatNumber2(entrada.TotalEntradaPrevista)} */}
                </td>
        <td>{formatNumber(totalDisponivel)}</td>
      </tr>
    </tbody>
  );
};

export default ProductList;
