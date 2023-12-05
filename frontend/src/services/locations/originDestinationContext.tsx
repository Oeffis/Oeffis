import React, { createContext, useContext } from "react";
import { useStateParams } from "../../hooks/useStateParams";

export interface OriginDestinationClients {
  origin: [string | null, (originId: string) => void];
  destination: [string | null, (destinationId: string) => void];
}

export const OriginDestinationContext = createContext<OriginDestinationClients | null>(null);

export function OriginDestinationProvider(props: { children: React.ReactNode }): JSX.Element {
  const originDestinationClients: OriginDestinationClients = {
    origin: useStateParams<string | null>(null, "origin", String, String),
    destination: useStateParams<string | null>(null, "destination", String, String)
  };

  return (
    <OriginDestinationContext.Provider value={originDestinationClients}>
      {props.children}
    </OriginDestinationContext.Provider>
  );
}

export function useOriginDestinationClients(): OriginDestinationClients {
  const context = useContext(OriginDestinationContext);
  if (!context) {
    throw new Error("origin and destination must be used within a OriginDestinationProvider");
  }

  return context;
}

export function useOriginId(): [string | null, (originId: string) => void] {
  const { origin } = useOriginDestinationClients();
  return origin;
}

export function useDestinationId(): [string | null, (destinationId: string) => void] {
  const { destination } = useOriginDestinationClients();
  return destination;
}
