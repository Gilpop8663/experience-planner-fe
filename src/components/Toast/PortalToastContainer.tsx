import ReactDOM from "react-dom";
import { Bounce, ToastContainer } from "react-toastify";

const PortalToastContainer = () => {
  const toastRoot = document.getElementById("toast-root");

  // toastRoot가 존재할 때만 createPortal 실행
  return toastRoot
    ? ReactDOM.createPortal(
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />,
        toastRoot,
      )
    : null;
};

export default PortalToastContainer;
