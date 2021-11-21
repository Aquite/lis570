import React from "react";
import ttest from "ttest";

const TTest = ({ dataLib, dataLoc, metric }) => {
  let noSex = [];
  let sex = [];
  dataLib = dataLib.slice(0, 20);
  for (let i = 0; i < dataLoc.length; i++) {
    let libraryName = dataLoc[i].Library;
    let sum = dataLib.reduce((a, b) => {
      return a + parseInt(b[libraryName]);
    }, 0);
    if (dataLoc[i][metric] == 1) {
      sex.push(sum);
    } else {
      noSex.push(sum);
    }
  }
  const test = ttest(sex, noSex);

  return <p>{metric + ": " + test.pValue()}</p>;
};

export default TTest;
