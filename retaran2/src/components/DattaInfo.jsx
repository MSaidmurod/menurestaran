import React, { useEffect } from "react";
import { useFetch } from "../hook/useFetch";

function DattaInfo({ setDatta, rest_id, tabl_id }) {
  const { data } = useFetch(
    `https://v1mobile.tursino.com/api/customer/qr/scanner/${rest_id}/${tabl_id}`
  );

  useEffect(() => {
    setDatta(data && data);
  }, [data]);
  return;
}

export default DattaInfo;
