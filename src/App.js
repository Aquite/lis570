import logo from "./logo.svg";
import "./App.css";
import Header from "./header/header-mini.js";
import MapChart from "./MapChart";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>LIS 570 Sex Education and Libraries</h1>
        <p>Test page</p>
      </header>
      <main>
        <MapChart />
      </main>
    </div>
  );
}

export default App;
