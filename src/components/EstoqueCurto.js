import React from 'react';

const EstoqueCurto = ({ estoques }) => {
    // Variáveis para armazenar os totais das colunas

    let total_filial = 0
    let total_arm = 0
    let total_lote = 0
    let total_qtd_dispo = 0
    let total_validade = 0
    let total_dias_vencimento = 0

    // Loop pelos produtos para calcular os totais das colunas
    estoques.forEach((estoque) => {
        total_qtd_dispo += estoque.qtd_dispo;
    });

    return (
        <tbody>
            <tr>
                <th id="titletab" colSpan="6" style={{ backgroundColor: "#e6e8ef" }}> Validade do Estoque</th>
            </tr>
            <tr>
                <th>Filial</th>
                <th>Armazém</th>
                <th>Lote</th>
                <th>Quantidade</th>
                <th>Validade</th>
                <th>Disponibilidade</th>
            </tr>

            {estoques.length === 0 ? (
                <tr>
                    <td colSpan="6" className="text-center">Nenhum dado disponível para este produto. </td>
                </tr>
            ) : (
                estoques.map((product, index) => {
                    return (
                        <tr key={index}>
                            <td>{product.filial}</td>
                            <td>{product.arm}</td>
                            <td>{product.lote}</td>
                            <td>{product.qtd_dispo}</td>
                            <td>{product.validade}</td>
                            <td>{product.dias_vencimento} Dias</td>
                        </tr>
                    );
                })
            )}

            {estoques.length > 0 && (
                <tr className="total-row">
                    <td>Total:</td>
                    <td></td>
                    <td></td>
                    <td>{total_qtd_dispo}</td>
                    <td></td>
                    <td></td>
                </tr>
            )}
        </tbody>
    );
};

export default EstoqueCurto;
