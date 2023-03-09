import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Components/Login';
import React from "react";
import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";
import AssignMe from "./Pages/AssignMe";
import TakeFromLocker from "./Pages/TakeFromLocker";
import Pending from "./Pages/Pending";
import PageNotFound from "./Pages/PageNotFound";
import ChangePassword from "./Pages/ChangePassword";






function App() {
  let isLoggedIn = localStorage.getItem("token");
  

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'
            render={() => isLoggedIn ? 
            <Dashboard /> 
            : <Login />} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/history' component={History} />
          <Route exact path='/assigntome' component={AssignMe} />
          <Route exact path='/takefromlocker' component={TakeFromLocker} />
          <Route exact path='/pending' component={Pending} />
          <Route exact path='/change' component={ChangePassword} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
