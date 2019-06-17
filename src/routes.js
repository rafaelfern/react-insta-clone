import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

/*
    Switch garante que apenas uma rota seja chamada 
    a cada url que o usuário acessar.
    Ver mais detalhes em:
    https://reacttraining.com/react-router/web/api/Route
*/

function Routes() {
    return(
        
        <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/new" component={New} />
        </Switch>
        
    );
}

export default Routes;
