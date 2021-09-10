import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WineBottles from "./components/wineCards/WineBottles";

function App() {
  return (
    <div id="App">
      <Header />
      <WineBottles />
      <Footer />
    </div>
  );
}

export default App;
