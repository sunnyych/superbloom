import React, { createContext, useContext, useState } from "react";
import { database } from "@/app/tabs/superbloom/superbloom-database";

const SuperbloomContext = createContext();

export const SuperbloomProvider = ({ children }) => {
  const [requestedDatabase, setRequestedDatabase] = useState(database);
  // for add new memory
  const [addedSuperbloom, setAddedSuperbloom] = useState(false);

  const postBloom = (bool) => {
    setAddedSuperbloom(bool);
  };

  const addBloom = (newBloom) => {
    setRequestedDatabase((prevDatabase) => [...prevDatabase, newBloom]);
  };

  const deleteBloom = (id) => {
    setRequestedDatabase((prevDatabase) =>
      prevDatabase.filter((requestedDatabase) => requestedDatabase.id !== id)
    );
  };

  const updateRequestStatus = (id) => {
    setRequestedDatabase((prevDatabase) =>
      prevDatabase.map((item) =>
        item.id === id ? { ...item, requested: true } : item
      )
    );
  };

  return (
    <SuperbloomContext.Provider
      value={{
        requestedDatabase,
        addBloom,
        updateRequestStatus,
        deleteBloom,
        postBloom,
        addedSuperbloom,
      }}
    >
      {children}
    </SuperbloomContext.Provider>
  );
};

export const useSuperbloom = () => {
  const context = useContext(SuperbloomContext);
  if (!context) {
    throw new Error("useSuperbloom must be used within a SuperbloomProvider");
  }
  return context;
};
