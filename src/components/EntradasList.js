import React from 'react';

const EntradasList = ({ entradas }) => {

  // Função auxiliar para formatar valores em quantidade
  const formatNumber = (number) => {
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Função auxiliar para formatar valores em R$
  const formatNumber2 = (number) => {
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  return (
    <tbody>
      <tr>
      <th className='title-tab' colSpan="5" style={{ backgroundColor: "#e6e8ef" }}>Análise Últimas Compras</th>
      </tr>
      <tr>
        <th>Data</th>
        <th>Fornecedor</th>
        <th>Qtd</th>
        <th>vUnit</th>
        <th>Total</th>
      </tr>
      {entradas.length === 0 ? (
        <tr>
          <td colSpan="5" className="text-center">Nenhum dado disponível para este produto. </td>
        </tr>
      ) : (
        entradas.map((entrada, index) => {
          return (
            <tr key={index}>
              <td>{entrada.Data}</td>
              <td>{entrada.Fornecedor}</td>
              <td>{entrada.Quantidade}</td>
              {/* <td>{formatNumber2(entrada.VlUnit)}</td>
              <td>{formatNumber2(entrada.Total)}</td> */}
              <td>{entrada.VlUnit}</td>
              <td>{entrada.Total}</td>
            </tr>
          );
        })
      )}
      {/* {entradas.length > 0 && (
        <tr className="total-row">
          <td>Total:</td>
          <td></td>
          <td>{formatNumber(totalQuantidade)}</td>
          <td></td>
          <td>{formatNumber2(totalTotal)}</td>
        </tr>
      )} */}
    </tbody>
  );
};

export default EntradasList;
