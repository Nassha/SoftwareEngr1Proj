import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NavbarBackend from './components/NavbarBackend';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import ShortestPath from './components/pages/ShortestPath';
import Sorting from './components/pages/Sorting';
import Dsa from './components/pages/Dsa';
import DataStructures from './components/pages/DataStructures';
import Information from './components/pages/Information';
import LoginForm from './components/pages/LoginForm';
import { UserContext } from './components/UserContext';
import Comment from './components/pages/comment';
import Admin from './components/pages/Admin';
import ManageUsers from './components/pages/ManageUsers';
import ManageDiscussion from './components/pages/ManageDiscussion';

function App() {
  const [value, setValue] = useState('Login/Register')
  
  if(window.location.pathname=="/admin"){
    return (
      <Router>
        <UserContext.Provider value={{value,setValue}}>
        <Switch>
        <Route path="/admin" exact component={Admin} />
        </Switch>
        </UserContext.Provider>
      </Router>  
    );
  }
  else if(window.location.pathname=="/manage-users" || window.location.pathname=="/manage-discussion"){
    return (
      <Router>
      <UserContext.Provider value={{value,setValue}}>
        <NavbarBackend />
        <Switch>
        <Route path="/manage-users" exact component={ManageUsers} />
        <Route path="/manage-discussion" exact component={ManageDiscussion} />
        </Switch>
        </UserContext.Provider>
      </Router>  
    );
  }
  return (
    <Router>
      <UserContext.Provider value={{value,setValue}}>
      <Navbar />
      
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/information" exact component={Information}/>
        <Route path="/sorting-algorithms" exact component={Sorting} />
        <Route path="/shortest-path-algorithms" exact component={ShortestPath} />
        <Route path="/data-structures" exact component={DataStructures} />
        <Route path="/login-form" exact component={LoginForm} />
        <Route path="/login-form/:id" exact component={LoginForm} />
        <Route path="/comments" exact component={Comment} />
      </Switch>
    
      <Footer />
      </UserContext.Provider>
    </Router> 
  );
}

export default App;
