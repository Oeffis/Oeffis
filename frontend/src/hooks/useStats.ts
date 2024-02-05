import { useEffect, useState } from "react";
import { Stats } from "../api";
import { useStatsApi } from "../services/apiClients/ApiClientsContext";

export const useStats = (): Stats => {
  const [stats, setStats] = useState<Stats>({
    allTimeDelays: [],
    last24HoursDelays: [],
    filled: false,
    time: new Date()
  });

  const abortController = new AbortController();
  const statsApi = useStatsApi();

  useEffect(() => {
    statsApi
      .statsControllerGetStats({ signal: abortController.signal })
      .then((stats) => {
        setStats(stats);
      })
      .catch((error) => {
        if (abortController.signal.aborted) return;
        console.error(error);
      });
  }, []);

  return stats;
};
