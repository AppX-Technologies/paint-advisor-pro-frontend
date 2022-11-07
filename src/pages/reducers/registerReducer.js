const registerReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_INPUT':
      return {
        ...state,
        [action.field]: action.payload
      };
    case 'HANDLE_OTP_INPUT':
      return {
        ...state,
        otp: action.payload
      };
    default:
      return state;
  }
};

export default registerReducer;
