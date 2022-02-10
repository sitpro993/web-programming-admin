import { Alert } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}
      {notify.err && (
        <Alert severity="error" color="error">
          {notify.err}
        </Alert>
        // <Toast
        //   msg={{ msg: notify.err, title: "error" }}
        //   handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
        // />
      )}

      {notify.success && (
        <Alert severity="success" color="success">
          {notify.err}
        </Alert>
        // <Toast
        //   msg={{ msg: notify.success, title: "success" }}
        //   handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
        // />
      )}
    </>
  );
};

export default Notify;
