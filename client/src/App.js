import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import SignupPage from "./components/Pages/SignupPage/SignupPage";
import LandingPage from "./components/Pages/LandingPage/LandingPage";
import TodosPages from "./components/Pages/TodosPage/TodosPages";
import ResetPassPage from "./components/Pages/ResetPassPage/ResetPassPage";
import NewPass from "./components/Pages/NewPass/NewPass";
import AccountPage from "./components/Pages/AccountPage/AccountPage";
import OverLay from "./components/utils/OverLay";
import TodosContext from "./context/Todos/TodosContext";
import "./App.scss";
import Dialog from "./components/utils/Dialog/Dialog";
import AddTodo from "./components/Pages/TodosPage/AddTodo/AddTodo";

function App() {
  const { isOverLay, isAddTodo, isDialog } = React.useContext(TodosContext);
  return (
    <Router>
      <div className="App">
        <Header />
        {isOverLay && <OverLay />}
        {isDialog && <Dialog />}
        {isAddTodo && <AddTodo />}
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/todos" component={TodosPages} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/newpassword" component={NewPass} />
            <Route exact path="/resetpassword" component={ResetPassPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
