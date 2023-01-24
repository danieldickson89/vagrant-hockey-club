import calculateOverall from "./calculateOverall";

export default function sortData(objectArray, propertyName, sortAsc) {
  console.log("BEFORE: ", objectArray[0]);
  if (propertyName === "overall") {
    if (sortAsc) {
      objectArray.sort(function (a, b) {
        if (calculateOverall(a) < calculateOverall(b)) {
          return -1;
        }
        if (calculateOverall(a) > calculateOverall(b)) {
          return 1;
        }
        return 0;
      });
    } else {
      objectArray.sort(function (a, b) {
        if (calculateOverall(a) > calculateOverall(b)) {
          return -1;
        }
        if (calculateOverall(a) < calculateOverall(b)) {
          return 1;
        }
        return 0;
      });
    }
  } else {
    if (sortAsc) {
      objectArray.sort(function (a, b) {
        if (a[propertyName] < b[propertyName]) {
          return -1;
        }
        if (a[propertyName] > b[propertyName]) {
          return 1;
        }
        return 0;
      });
    } else {
      objectArray.sort(function (a, b) {
        if (a[propertyName] > b[propertyName]) {
          return -1;
        }
        if (a[propertyName] < b[propertyName]) {
          return 1;
        }
        return 0;
      });
    }
  }
  console.log("AFTER: ", objectArray[0]);
}
