import './App.css';
import Navbar from './components/Navbar'
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import { ServicesProvider } from './components/ServicesContext.jsx'
import Login from './pages/Login.jsx';
import LoginButton from './components/LoginButton.jsx';
import Profile from './components/Profile.jsx';


function App() {


  return (
    <div className="App">
    <HashRouter>

    <Router>
    {/* <Login></Login> */}
    {/* <LoginButton></LoginButton> */}
    <ServicesProvider>
      <Navbar></Navbar>
      <AnimatedRoutes></AnimatedRoutes>
    </ServicesProvider>
    </Router>
    </HashRouter>
    </div>
  );
}

export default App;
