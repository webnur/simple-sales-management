import toast from "react-hot-toast";

export const makeToast = (text: string) => {
  toast.success(text, {
    style: {
      borderRadius: "4px",
      background: "#333",
      color: "#fff",
      // padding: "10px",
      // fontSize: "16px",
      // fontWeight: "bold",
      // maxWidth: "300px",
    },
  });
};
