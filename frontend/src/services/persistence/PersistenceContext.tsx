
import { createContext, PropsWithChildren, useContext } from "react";
import { PersistenceService } from "./PersistenceService";

export const PersistenceContext = createContext<PersistenceService>(new PersistenceService());

// After thinking about it this may need to restuctured to be more like the FavouritesContext.
// But doing so would lead to a generic eventbus thou all parts of the app, which is something
// we may want to avoid.
export function PersistenceProvider(props: PropsWithChildren): JSX.Element {

  return (
    <PersistenceContext.Provider value={new PersistenceService()}>
      {props.children}
    </PersistenceContext.Provider>
  );
}

export function usePersistence(): PersistenceService {
  const persistence = useContext(PersistenceContext);

  if (!persistence) {
    throw new Error("PersistenceContext not found");
  }

  return persistence;
}
