
import { createContext } from "react";
import useSWR from "swr";
import { OpenAPI } from "../api";
import { AppConfig } from "./appConfig";

export const AppConfigContext = createContext<AppConfig>({} as AppConfig);

async function fetcher<C>(url: string): Promise<C> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.body?.toString() || "Failed to fetch");
  return res.json();
}

export function AppConfigProvider(props: { children: React.ReactNode }): JSX.Element {
  const { data, error } = useSWR<AppConfig>("/config/config.json", fetcher);
  if (error) {
    return <div>Failed to load config</div>;
  }
  if (!data) {
    return <div>Loading config...</div>;
  }
  console.debug("appConfig", data);
  OpenAPI.BASE = data.apiUrl;
  return (
    <AppConfigContext.Provider value={data}>
      {props.children}
    </AppConfigContext.Provider>
  );
}
