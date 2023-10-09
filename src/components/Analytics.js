import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate  } from 'react-router-dom'; 
import NavBar from './NavBar';
import ProductList from '../components/ProductList';
import EntradasList from '../components/EntradasList';
import EstoqueCurto from '../components/EstoqueCurto';
import moment from 'moment';


import './produto.css';
import { formatNumber, validateToken } from './helpers';

function Analytics() {

  const history = useNavigate(); 
  const { codigo, quantidade } = useParams();
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [totalDisponivel, setTotalDisponivel] = useState(0);
  const [products, setProducts] = useState([]);
  const [produto, setProduto] = useState({
    codigo: "",
    unidade: "",
    descricao: "",
    tipo: "",
    qtd_embalag: 0,
    entrega: 0,
    tipo_prazo: "",
    lead_time: "",
    prazo_valido: "",
    lote_economico: 0,
    lote_minimo: 0
  });

  const [estoques, setEstoques] = useState([]);

  const [entradas, setEntradas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchAnalyticsData = async () => {
      try {
        const token = await validateToken();
        // Buscar descrição do produto
        const descricaoProdutoUrl = `${process.env.REACT_APP_API_URL_PRODUTO}/${codigo}`;
        const descricaoProdutoResponse = await fetch(descricaoProdutoUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!descricaoProdutoResponse.ok) {
          console.log('Erro ao buscar descrição do produto');
        }
        const descricaoProdutoData = await descricaoProdutoResponse.json();
        setDescricaoProduto(descricaoProdutoData[0]?.descricaoProduto || '');
        setTotalDisponivel(descricaoProdutoData[0]?.totalDisponivel || '');


        // Buscar detalhes do produto
        const detalhesProdutoUrl = `${process.env.REACT_APP_API_URL_PROD_DETALHES}/${codigo}`;
        const detalhesProdutoResponse = await fetch(detalhesProdutoUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!detalhesProdutoResponse.ok) {
          console.log('Erro ao buscar detalhes do produto');
          return;
        }
        const detalhesProdutoData = await detalhesProdutoResponse.json();
        setProduto(detalhesProdutoData[0] || {});


        // Buscar lista de produtos
        const productsUrl = `${process.env.REACT_APP_API_URL_B8}/${codigo}`;
        const productsResponse = await fetch(productsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (!productsResponse.ok) {
          // const errorData = await productsResponse.json();
          // console.log('Erro ao buscar lista de produtos:', errorData.error);
          setProducts([]);
        } else {
          const productsData = await productsResponse.json();
          setProducts(productsData);
        }


        // Buscar Estoque curto de produtos
        const estoquecUrl = `${process.env.REACT_APP_API_URL_EST_CURTO}/${codigo}`;
        const estoquecResponse = await fetch(estoquecUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (!estoquecResponse.ok) {
          setEstoques([]);
        } else {
          const estoquesData = await estoquecResponse.json();
          setEstoques(estoquesData);
        }


        // Buscar lista de entradas
        const entradasUrl = `${process.env.REACT_APP_API_URL_D1}/${codigo}`;
        const entradasResponse = await fetch(entradasUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!entradasResponse.ok) {
          const errorData = await entradasResponse.json();
          console.log('Erro ao buscar lista de entradas:', errorData.error);
          setEntradas([]);
        } else {
          const entradasData = await entradasResponse.json();
          setEntradas(entradasData);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [codigo]);


  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div class="custom-loader"></div>
      </div>
    );
  }

  if (error) {
    history('/login'); 
  }
  const setTotalFromProductList = (total) => {
    setTotalDisponivel(formatNumber(total));
  };

  let valorMedioMensalAnoAtual = 0;
  let valorMedio = 0;
  let valorMedioUn = 0;
  let consMedioDiario30d = 0;
  let consMedioDiario30dUn = 0;
  let valorMedioAnoAnterior = 0;
  let valorMedioAnoAnteriorUn = 0;
  let valorMedioAnoAnteriorD = 0;
  let valorMedioAnoAnteriorDUn = 0;
  let i = 0;
  let dt_iterada = '';
  let dia01 = '';
  let anterior30d = '';
  let meses = 0; // Valor padrão
  let data_posterior = '';
  const anoAtual = moment().year();
  const dia01AnoAtual = moment().startOf('year');
  const anoAnterior = moment().subtract(1, 'year').year();
  const ultimoDiaMesCompleto = moment().subtract(1, 'month').endOf('month');

  // Loop pelas entradas para calcular os totais
  entradas.forEach((entrada) => {

    dt_iterada = moment(entrada.Data, 'DD/MM/YYYY');

    if (dt_iterada.year() === anoAtual && dt_iterada.isBetween(dia01AnoAtual, ultimoDiaMesCompleto, null, '[]')) { // Soma as entradas apenas do ano atual (2023)

      valorMedioMensalAnoAtual += entrada.Total;
      valorMedioUn += entrada.Quantidade;

      if (!dt_iterada.isSame(data_posterior)) { // Para calcular médias por dia desconsidera o dia da entrada se já foi contabilizado o dia anteriormente
        i++;
        data_posterior = dt_iterada;
      }
    }
    if (dt_iterada.year() === anoAnterior) { // Soma valores e unidades apenas do ano anterior (2022)
      valorMedioAnoAnterior += entrada.Total;
      valorMedioAnoAnteriorUn += entrada.Quantidade;
    }
    if (i == 1) { // Capturar o dia mais recente e o anterior 30 dias 
      dia01 = dt_iterada;
      anterior30d = moment(dia01).subtract(30, 'days');
    }
    if (dt_iterada.isBetween(anterior30d, dia01, null, '[]')) { // Soma valores e unidades apenas dos últimnos 30 dias
      consMedioDiario30d += entrada.Total;
      consMedioDiario30dUn += entrada.Quantidade;
    }
  });

  // const meses = dia01.diff(primeiroDiaAnoAtual, 'months'); // Calcula a quantidade de meses completos do ano atual
  if (dia01) {
    const primeiroDiaAnoAtual = moment(dia01).startOf('year');
    meses = dia01.diff(primeiroDiaAnoAtual, 'months');
  }
  valorMedio = formatNumber(valorMedioMensalAnoAtual / meses); // Valor médio mensal (ano atual)
  valorMedioUn = formatNumber(valorMedioUn / meses); // Quantidade média de unidades por mês (ano atual)

  consMedioDiario30d = formatNumber(consMedioDiario30d / 30); // Valor médio diário nos últimos 30 dias
  consMedioDiario30dUn = formatNumber(consMedioDiario30dUn / 30); // Quantidade média diária nos últimos 30 dias

  valorMedioAnoAnteriorD = formatNumber(valorMedioAnoAnterior / 365); // Cons. Médio Diário (ano anterior)
  valorMedioAnoAnteriorDUn = formatNumber(valorMedioAnoAnteriorUn / 365); // Cons. Médio Mensal - unidades (ano anterior)

  valorMedioAnoAnterior = formatNumber(valorMedioAnoAnterior / 12); // Cons. Médio Mensal (ano anterior)
  valorMedioAnoAnteriorUn = formatNumber(valorMedioAnoAnteriorUn / 12); // Cons. Médio Mensal - unidades (ano anterior)

  return (
    <div>
      <NavBar />
      <div className="container texto-pequeno">
        <div className="card" style={{ marginTop: '45px' }}>
          <div class="card-body ">
            <h5 className="card-title  " style={{ backgroundColor: '#FECA78', padding: '10px', fontSize: '0.9em' }}>{codigo} - {descricaoProduto}</h5>
            <div className="row">
              <p class="card-text">
                <div className="row">
                  <div className="col-md-3">
                    <ul className="list-unstyled">
                      <li className="margin-item text-end" >
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Unidade: <span className="badge rounded-pill bg-light text-dark "><b>{produto.unidade}</b></span></div>
                        </span>
                      </li>
                      <li className="margin-item text-end">
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Tipo: <span className="badge rounded-pill bg-light text-dark"><b>{produto.tipo}</b></span></div>
                        </span>
                      </li>
                      <li className="margin-item text-end">
                        <span className="rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Quantidade de embalagem: <span className="badge rounded-pill bg-light text-dark"><b>{produto.qtd_embalag} {produto.unidade}</b></span></div>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <ul className="list-unstyled">
                      <li className="margin-item text-end">
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Entrega: <span className="badge rounded-pill bg-light text-dark"><b>{produto.entrega}</b></span></div>
                        </span>
                      </li>
                      <li className="margin-item text-end">
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Tipo de prazo: <span className="badge rounded-pill bg-light text-dark"><b>{produto.tipo_prazo}</b></span></div>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <ul className="list-unstyled">
                      <li className="margin-item text-end">
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Lead time: <span className="badge rounded-pill bg-light text-dark"><b>{produto.lead_time}</b></span></div>
                        </span>
                      </li>
                      <li className="margin-item text-end">
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Prazo válido: <span className="badge rounded-pill bg-light text-dark"><b>{produto.prazo_valido}</b></span></div>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <ul className="list-unstyled">
                      <li className="margin-item text-end">
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Lote econômico: <span className="badge rounded-pill bg-light text-dark"><b>{produto.lote_economico}</b></span></div>
                        </span>
                      </li>
                      <li className="margin-item text-end">
                        <span className=" rounded-pill bg-primary text-black text-bigger">
                          <div className="padding-item">Lote mínimo:   &nbsp;
                            <span className={`badge rounded-pill rounded-pill   text-bigger text-white ${quantidade > produto.lote_minimo ? 'bg-primary' : ' bg-danger'}`} >
                              <b> {produto.lote_minimo}  {produto.unidade}</b>
                            </span></div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </p>
            </div>
          </div>

        </div>

        <div className="card" style={{ marginTop: '20px' }}>
          <div className="row" style={{ paddingTop: '20px', paddingBottom: '10px' }}>
            <div className="col-md-4">
              <ul className="list-unstyled">
                <li className="margin-item text-end ml-20">
                  <span className="rounded-pill bg-primary text-black text-bigger">
                    <div className="padding-item">Quantidade Solicitada:
                      <span className="badge rounded-pill bg-light text-dark">
                        <b>{quantidade}</b> {produto.unidade}
                      </span>
                    </div>
                  </span>
                </li>
                <li className="margin-item text-end">
                  <span className="rounded-pill bg-primary text-black text-bigger">
                    <div className="padding-item">Quantidade Estoque:
                      <span className="badge rounded-pill bg-light text-dark">
                        <b>{totalDisponivel}</b> {produto.unidade}
                      </span>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-unstyled">
                <li className="margin-item text-end">
                  <span className="rounded-pill bg-primary text-black text-bigger">
                    <div className="padding-item">Cons. Médio Mensal ({anoAnterior}):
                      <span className="badge rounded-pill bg-light text-dark">
                        <b>R$ {valorMedioAnoAnterior} <span style={{ color: 'grey' }}>( {valorMedioAnoAnteriorUn} {produto.unidade})</span></b>
                      </span>
                    </div>
                  </span>
                </li>
                <li className="margin-item text-end">
                  <span className="rounded-pill bg-primary text-black text-bigger">
                    <div className="padding-item">Cons. Médio Diário ({anoAnterior}):
                      <span className="badge rounded-pill bg-light text-dark">
                        <b>R$ {valorMedioAnoAnteriorD}  <span style={{ color: 'grey' }}>( {valorMedioAnoAnteriorDUn} {produto.unidade})</span></b>
                      </span>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-unstyled">
                <li className="margin-item text-end">
                  <span className="rounded-pill bg-primary text-black text-bigger">
                    <div className="padding-item">Valor Médio Mensal ({anoAtual}):
                      <span className="badge rounded-pill bg-light text-dark">
                        <b>R$ {valorMedio} <span style={{ color: 'grey' }}>( {valorMedioUn} {produto.unidade})</span></b>
                      </span>
                    </div>
                  </span>
                </li>
                <li className="margin-item text-end">
                  <span className="rounded-pill bg-primary text-black text-bigger">
                    <div className="padding-item">Valor Médio Diário (30 dias):
                      <span className="badge rounded-pill bg-light text-dark">
                        <b>R$ {consMedioDiario30d}  <span style={{ color: 'grey' }}>( {consMedioDiario30dUn} {produto.unidade})</span></b>
                      </span>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <table className="table table-bordered table-striped">
              <ProductList products={products} onTotalDisponivelChange={setTotalFromProductList} />
            </table>
            <table className="table table-bordered table-striped">
              <EstoqueCurto estoques={estoques} />
            </table>
          </div>
          <div className="col-md-6" style={{ overflow: 'scroll', height: '400px' }}>
            <table className="table table-bordered table-striped">
              <EntradasList entradas={entradas} />
            </table>
          </div>
        </div>
      </div>
      <footer className="footer fixed-bottom">
        <p>&copy; 2023 Portal Linea Alimentos - Desenvolvido por TI Línea</p>
      </footer>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    </div>
  );
}

export default Analytics;
