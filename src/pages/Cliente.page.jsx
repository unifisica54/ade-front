import React from "react";
import FHMenu from "../widgets/FHMenu";
import Clientes from "../components/Clientes";
const ClientePage = () => {
  return (
    <>
      <FHMenu>
        <Clientes />
      </FHMenu>
    </>
  );
};

export default ClientePage;