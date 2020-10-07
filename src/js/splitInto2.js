export default {
    getFirstPart: (arr) => {
      let firstPart = [];
      for (let i = 0; i < Math.ceil(arr.length/2); i++) {
        firstPart.push(arr[i])
      };
      return firstPart
    },
    getSecondPart: (arr) => {
      let secondPart = [];
      for (let i = Math.ceil(arr.length/2); i < arr.length; i++) {
        secondPart.push(arr[i])
      };
      return secondPart
    }
  };