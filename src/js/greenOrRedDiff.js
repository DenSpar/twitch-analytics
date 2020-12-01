const greenOrRedDiff = (defaultClass, diff) => {
    let classes = [defaultClass];
    if (diff && diff.length > 1) {
      if (diff[0] === '+') { classes.push("greenDiff") };
      if (diff[0] === '-') { classes.push("redDiff") };
    };
    return classes.join(' ')
  };

export default greenOrRedDiff;