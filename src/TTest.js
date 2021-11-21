import React from "react";

const TTest = ({ dataLib, dataLoc }) => {
  let noSex = [];
  let sex = [];
  dataLib = dataLib.slice(0, 20);
  console.log(dataLib);
  console.log(dataLoc);
  for (let i = 0; i < dataLoc.length; i++) {
    let libraryName = dataLoc[i].Library;
    let sum = dataLib.reduce((a, b) => {
      return a + parseInt(b[libraryName]);
    }, 0);
    if (dataLoc[i].Taught == 1) {
      sex.push(sum);
      if (isNaN(sum)) {
        console.log(dataLoc[i].Library);
      }
    } else {
      noSex.push(sum);
    }
  }
  console.log("sex:", sex);
  console.log("nosex:", noSex);

  return <p>test</p>;
};

export default TTest;
