export const validatePhone = (no) => {
  if (no.length == 10) {
    let element = 0;
    let count = 0;
    let arr = no.toString().split("");
    for (let index = 0; index < arr.length; index++) {
      if (element === arr[index]) {
        count++;
      } else {
        element = arr[index];
      }
    }
    if (count >= 5) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
