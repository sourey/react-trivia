import axios from "axios";

export const axiosGet = (url, successCallback, failureCallback) => {
  axios
    .get(url)
    .then(
      successCallback ||
        function(response) {
          alert(response.message);
        }
    )
    .catch(
      failureCallback ||
        function(error) {
          alert(error.message);
        }
    );
};

export const axiosPost = (url, params, successCallback, failureCallback) => {
  let doPost = axios.post(url, params);
  doPost
    .then(
      successCallback ||
        function(response) {
          //swal("Success", response.message, "success");
          alert();
        }
    )
    .catch(
      failureCallback ||
        function(error) {
          let errorResponse = error.response ? error.response.data : error;
          //   swal(
          //     errorResponse.error || "Network Error",
          //     errorResponse.message,
          //     "error"
          //   );
        }
    );
};

export const axiosDelete = (url, successCallback, failureCallback) => {
  axios
    .delete(url)
    .then(
      successCallback ||
        function(response) {
          //swal("Success", response.message, "success");
        }
    )
    .catch(
      failureCallback ||
        function(error) {
          let errorResponse = error.response ? error.response.data : error;
          //   swal(
          //     errorResponse.error || "Network Error",
          //     errorResponse.message,
          //     "error"
          //   );
        }
    );
};
