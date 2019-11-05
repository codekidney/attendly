import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from './components';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {HomeContainer as Home, MeetingContainer as Meeting} from './routes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Header title="Planowanie spotkań"/>
        <Container className="Content">
            <Row>
                <Col>
                    <Switch>
                        <Route path={`${process.env.PUBLIC_URL}/meeting/add`} component={Meeting}/>
                        <Route path={`${process.env.PUBLIC_URL}/`} component={Home}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
    </BrowserRouter>,
document.getElementById('root')
);
serviceWorker.unregister();
