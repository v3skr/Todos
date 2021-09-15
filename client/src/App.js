import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import SignupPage from "./components/Pages/SignupPage/SignupPage";
import LandingPage from "./components/Pages/LandingPage/LandingPage";
import TodosPages from "./components/Pages/TodosPage/TodosPages";
import ResetPassPage from "./components/Pages/ResetPassPage/ResetPassPage";
import NewPass from "./components/Pages/NewPass/NewPass";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/newpassword" component={NewPass} />
            <Route exact path="/todos" component={TodosPages} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/resetpassword" component={ResetPassPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
