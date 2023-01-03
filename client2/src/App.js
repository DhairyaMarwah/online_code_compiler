
import Navigation from './routes/routes';
import { BrowserRouter } from "react-router-dom"; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Navigation/>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
