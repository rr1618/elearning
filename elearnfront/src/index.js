import React ,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Spin } from 'antd';
import App from './App';
import Elearning from './elearning';
import { useCookies } from "react-cookie";
import Login from "./components/login";
import Uploader from "./elearnComponents/awsuploader";
import Register from './components/register';
import * as serviceWorker from './serviceWorker';
import {Redirect,BrowserRouter,Route} from "react-router-dom";
import {CookiesProvider} from "react-cookie";

const Dashboard = lazy(() =>
    import ("./components/dashboard")
);
function Perfect({}) {
   const [cookie,,] = useCookies(['name']);
    return(
        <Suspense fallback={<Spin/>}>
            <CookiesProvider>
                    <BrowserRouter >
                        <Route exact path="/uploader"><Uploader/></Route>
                        <Route exact path="/elearning"><Elearning/></Route>
                        <Route exact path="/login"><Login/></Route>
                        <Route exact path="/register"><Register/></Route>
                        <Route exact path="/"><App/></Route>
                        <Route exact path="/dashboard">{cookie['name']?<Dashboard/>:<Redirect to="/login"/>}</Route>

                    </BrowserRouter>
            </CookiesProvider>
            </Suspense>
    )
}
ReactDOM.render(
     <Perfect/>

,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
