import Toast from "react-native-toast-message";

const showToast = (type, title, message) => {
  Toast.show({
    type: type,
    text1: title || " ",
    text2: message || "",
    position: "top",
  });
};

export default showToast;
