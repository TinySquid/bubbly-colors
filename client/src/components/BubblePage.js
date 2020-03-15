import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "./axiosWithAuth";
import { base_url } from "./base_url";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem("token");
    history.push("/");
  };

  const reorderColors = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`${base_url}/api/colors`)
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        setColorList(response.data.colors);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!colorList) return <div>Loading color data...</div>;

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} reorderColors={reorderColors} logout={logout} />
      <Bubbles colors={colorList} refresh={refresh} />
    </>
  );
};

export default BubblePage;
