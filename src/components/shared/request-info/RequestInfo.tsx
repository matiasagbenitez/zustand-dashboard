import { useEffect, useState } from "react";
import tesloApi from "../../../api/teslo.api";

export const RequestInfo = () => {
  const [requestInfo, setRequestInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((res) => {
        setRequestInfo(res.data);
      })
      .catch(() => {
        setRequestInfo("Error");
      });
  }, []);
  return (
    <div className="text-sm text-gray-500 word-break-all">
      <h2>Información</h2>
      <p>{JSON.stringify(requestInfo as string, null, 2)}</p>
    </div>
  );
};
