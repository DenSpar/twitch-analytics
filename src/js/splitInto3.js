// eslint-disable-next-line
export default {
    getFirstPart: (arr) => {
      let firstPart = [];
      for (let i = 0; i < Math.ceil(arr.length/3); i++) {
        firstPart.push(arr[i])
      };
      return firstPart
    },
    getSecondPart: (arr) => {
      let secondPart = [];
      for (let i = Math.ceil(arr.length/3); i < Math.ceil(arr.length*2/3); i++) {
        secondPart.push(arr[i])
      };
      return secondPart
    },
    getThirdPart: (arr) => {
      let thirdPart = [];
      for (let i = Math.ceil(arr.length*2/3); i < arr.length; i++) {
        thirdPart.push(arr[i])
      };
      return thirdPart
    }
  };