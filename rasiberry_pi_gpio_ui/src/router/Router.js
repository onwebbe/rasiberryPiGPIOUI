import React from 'react';
import {HashRouter, Route, Switch, useHistory} from 'react-router-dom';
import ViewPersonCardList from '../views/ViewPersonCardList';
import ViewFacesContent from '../views/ViewFacesContent';
import GPIOOverview from '../views/GPIOOverview';
import ManagePiDevice from '../views/ManagePiDevice';
import WeatherView from '../views/WeatherView';
import ChartConfig from '../views/ChartConfig';

const BasicRoute = () => (
    <HashRouter history={useHistory}>
        <Switch>
            <Route exact path="/" component={WeatherView}/>
            <Route exact path="/gpioOverview" component={GPIOOverview}/>
            <Route exact path="/managePiDevice" component={ManagePiDevice}/>
            <Route exact path="/personCardList" component={ViewPersonCardList}/>
            <Route exact path="/faceList/:personId" component={ViewFacesContent}/>
            <Route exact path="/weather" component={WeatherView}/>
            <Route exact path="/chartConfig" component={ChartConfig}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;