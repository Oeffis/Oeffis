import { useEffect, useState } from "react";
import { Stats } from "../api";
import { useStatsApi } from "../services/apiClients/ApiClientsContext";

export const useStats = (): Stats => {
  const [stats, setStats] = useState<Stats>({ delays: [] });

  const abortController = new AbortController();
  const statsApi = useStatsApi();

  useEffect(() => {
    statsApi
      .statsControllerGetStats({ signal: abortController.signal })
      .then((stats) => {
        setStats(stats);
      });
  }, []);

  return stats;
};
