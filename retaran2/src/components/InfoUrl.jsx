import { useFetch } from "../hook/useFetch";
import { useEffect, useState } from "react";
//firebase
import { set, ref, onValue, remove, update, push } from "firebase/database";
import { db } from "../firebase/firebase_config";

function InfoUrl({ setStol_number, setFoyz, res_id, tab_id, setOfitsant }) {
  const { data } = useFetch(
    `https://v1mobile.tursino.com/api/customer/qr/scanner/${res_id}/${tab_id}`
  );
  let chekId = localStorage.getItem("chekId");
  useEffect(() => {
    setStol_number(data && data.number);
    setFoyz(data && data.foyz);
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((prev) => {
          if (prev[`${res_id}`].customer) {
            if (prev[`${res_id}`].customer[`${chekId}`] != null) {
              setOfitsant(
                prev[`${res_id}`].customer[`${chekId}`].waiterPercent
              );
            }
          }
        });
      }
    });
  });

  return <></>;
}

export default InfoUrl;
