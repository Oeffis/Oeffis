import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";

export function useStateParams<T>(
  initialState: T,
  paramsName: string,
  serialize: (state: T) => string,
  deserialize: (state: string) => T
): [T, (state: T) => void] {
  const history = useIonRouter();
  const search = new URLSearchParams(history.routeInfo.search);

  const existingValue = search.get(paramsName);
  const [state, setState] = useState<T>(
    existingValue ? deserialize(existingValue) : initialState
  );

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setState(deserialize(existingValue));
    }
  }, [existingValue]);

  const onChange = (s: T): void => {
    setState(s);
    const searchParams = new URLSearchParams(history.routeInfo.search);
    searchParams.set(paramsName, serialize(s));
    const pathname = history.routeInfo.pathname;
    history.push(pathname + "?" + searchParams.toString(), "forward");
  };

  return [state, onChange];
}
