
import { createContext, PropsWithChildren } from "react";
import { PersistenceService } from "./PersistenceService";

export const PersistenceContext = createContext<PersistenceService>(new PersistenceService());

export function PersistenceProvider(props: PropsWithChildren): JSX.Element {

  return (
    <PersistenceContext.Provider value={new PersistenceService()}>
      {props.children}
    </PersistenceContext.Provider>
  );
}
