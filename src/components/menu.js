import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import gobi from '../img/gobi.png';
import meurh from '../img/meurh.png';
import onlinea from '../img/onlinea.png';
import './menu.css';

class Menu extends React.Component {
    render() {
        return (
            <div className="container container-menu home-container" style={{ marginTop: '100px', backgroundColor: 'none!important' }}>
                <Card className='card-menu'>
                    <Card.Img className='card-img-top-menu' variant="top" src={gobi} />
                    <Card.Body className='card-body-menu'>
                        <Card.Title className='card-title-menu'>GOBI</Card.Title>
                        <Card.Text className='card-text-menu'>
                            Relatórios.
                        </Card.Text>
                        <Button className='btn-primary-menu' variant="primary" onClick={() => window.open('https://bi.gobetech.com.br', '_blank')}>Acessar</Button>
                    </Card.Body>
                </Card>


                <Card className='card-menu'>
                    <Card.Img className='card-img-top-menu' variant="top" src={meurh} />
                    <Card.Body className='card-body-menu'>
                        <Card.Title className='card-title-menu'>Meu RH</Card.Title>
                        <Card.Text className='card-text-menu'>
                            Rendimentos, contracheque e férias.
                        </Card.Text>
                        <Button className='btn-primary-menu' variant="primary" onClick={() => window.open('http://www.erplineaalimentos.com.br:8095/01/#/login', '_blank')}>Acessar</Button>
                    </Card.Body>
                </Card>


                <Card className='card-menu'>
                    <Card.Img className='card-img-top-menu' variant="top" src={onlinea} />
                    <Card.Body className='card-body-menu'>
                        <Card.Title className='card-title-menu'>OnLinea</Card.Title>
                        <Card.Text className='card-text-menu'>
                            Caderno Virtual Linea.
                        </Card.Text>
                        <Button className='btn-primary-menu' variant="primary" onClick={() => window.open('https://linea.cadernovirtual.com.br/default.aspx', '_blank')}>Acessar</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Menu;
