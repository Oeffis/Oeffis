import { IonLabel } from "@ionic/react";
import { DelayStats, LegStats } from "../api";

export function DisplayDelayStats({ stats, destinationName, originName }: { stats: LegStats, destinationName: string, originName: string }): JSX.Element {
  const statusBulletPoints: JSX.Element[] = [];

  if (stats.destinationDelayStats.status === "available") {
    const { averageDelay, maxDelay } = stats.destinationDelayStats as DelayStats;

    statusBulletPoints.push(
      <li key="dest_averageDelay">
        Ist durchschnittlich {formatToMinutesToHumanReadableString(averageDelay)} später in {destinationName}.
      </li>
    );
    statusBulletPoints.push(
      <li key="dest_maxDelay">
        Ist maximal {formatToMinutesToHumanReadableString(maxDelay)} später in {destinationName}.
      </li>
    );
  } else {
    statusBulletPoints.push(
      <li key="dest_unavailable">
        Verspätungsdaten zum Ziel {destinationName} nicht verfügbar.
      </li>
    );
  }

  if (stats.originDelayStats.status === "available") {
    const { averageDelay, maxDelay } = stats.originDelayStats as DelayStats;

    statusBulletPoints.push(
      <li key="origin_averageDelay">
        Fährt durchschnittlich {formatToMinutesToHumanReadableString(averageDelay)} später bei {originName} ab.
      </li>
    );
    statusBulletPoints.push(
      <li key="origin_maxDelay">
        Fährt maximal {formatToMinutesToHumanReadableString(maxDelay)} später bei {originName} ab.
      </li>
    );
  } else {
    statusBulletPoints.push(
      <li key="origin_unavailable">
        Verspätungsdaten vom Start {originName} nicht verfügbar.
      </li>
    );
  }

  if (stats.destinationDelayStats.status === "unavailable" && stats.originDelayStats.status === "unavailable") {
    return <DisplayDelayStatsUnavailabe />;
  }

  return (
    <div>
      <IonLabel>Historischen Verspätungsdaten der letzten zwei Wochen:</IonLabel>
      <ul>
        {statusBulletPoints}
      </ul>
    </div>
  );
}

function formatToMinutesToHumanReadableString(minutes: number): string {
  if (minutes < 1) {
    return "weniger als eine Minute";
  }

  const fullMinutes = Math.round(minutes);
  if (fullMinutes === 1) {
    return "ca. eine Minute";
  }

  return `ca. ${fullMinutes} Minuten`;
}

function DisplayDelayStatsUnavailabe(): JSX.Element {

  return (
    <div>
      <IonLabel>
        Keine historischen Verspätungsdaten für diesen Streckenabschnitt verfügbar.
      </IonLabel>
    </div>
  );
}
