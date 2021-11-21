import logo from "./logo.svg";
import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Header from "./header/header-mini.js";
import MapChart from "./MapChart";
import TTest from "./TTest.js";
import React from "react";

function App() {
  const [dataLoc, loadingLoc] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraryloc.csv"
  );

  const [dataLib, loadingLib] = useFetch(
    "https://raw.githubusercontent.com/Aquite/lis570/main/data/libraries.csv"
  );

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>LIS 570 Sex Education and Libraries</h1>
        <p>Test page</p>
      </header>
      <main>
        {loadingLoc ? <p>Loading...</p> : <MapChart dataLoc={dataLoc} />}
        {loadingLoc || loadingLib ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Taught"} />
            <TTest dataLib={dataLib} dataLoc={dataLoc} metric={"Rural"} />
            <TTest
              dataLib={dataLib}
              dataLoc={dataLoc}
              metric={"Conservative"}
            />
          </React.Fragment>
        )}
      </main>
    </div>
  );
}

export default App;
