// eslint-disable-next-line
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
      if (arr.length%2 === 1) {
        let emptyRow = {
          name: "",
          id: null,
          logo: null,
          followers: {
            actual: null,
            diff: null
          },
          onlineViewers:{
            inDays: null,
            max: null,
            middle: null
          },
          stream: null
        };
        secondPart.push(emptyRow);
      }
      return secondPart
    }
  };