
import { createContext, useContext } from "react";
import useSWR from "swr";
import { AppConfig } from "./appConfig";

export const AppConfigContext = createContext<AppConfig | null>(null);

async function fetcher<C>(url: string): Promise<C> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.body?.toString() ?? "Failed to fetch");
  return res.json() as Promise<C>;
}

export function AppConfigProvider(props: { children: React.ReactNode }): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR<AppConfig>("/config/config.json", fetcher);
  if (error) {
    return <div>Failed to load config</div>;
  }
  if (!data) {
    return <div>Loading config...</div>;
  }

  console.debug("appConfig", { data });

  return (
    <AppConfigContext.Provider value={data}>
      {props.children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig(): AppConfig {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error("useAppConfig must be used within a AppConfigProvider");
  }

  return context;
}
