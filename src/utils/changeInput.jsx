export const changeInput = (change) => {
    //function for when the user will touch in show password
    if (change === true) {
        return {type:'text', change: false};
    } else {
        return {type:'password', change: true};
    }
  };