import calculateOverall from "./calculateOverall";

export default function sortData(objectArray, propertyName, sortType, sortAsc) {
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
  } else if (sortType === "abc") {
    if (sortAsc) {
      objectArray.sort(function (a, b) {
        if (a[propertyName].toLowerCase() < b[propertyName].toLowerCase()) {
          return -1;
        }
        if (a[propertyName].toLowerCase() > b[propertyName].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      objectArray.sort(function (a, b) {
        if (a[propertyName].toLowerCase() > b[propertyName].toLowerCase()) {
          return -1;
        }
        if (a[propertyName].toLowerCase() < b[propertyName].toLowerCase()) {
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
}
