import { IonLabel } from "@ionic/react";
import { LegStats, UnavailableLegStats } from "../api";

export function DisplayDelayStats({ stats }: { stats: LegStats | UnavailableLegStats }): JSX.Element {
  if (stats.status === "unavailable") {
    return <DisplayDelayStatsUnavailabe stats={stats as UnavailableLegStats} />;
  }

  const { averageDelay, maxDelay } = stats as LegStats;

  return (
    <div>
      <IonLabel>Historischen Verspätungsdaten der letzten zwei Wochen:</IonLabel>
      <ul>
        <li>Durchschnittlich {formatToMinutesToHumanReadableString(averageDelay)} später</li>
        <li>Maximal {formatToMinutesToHumanReadableString(maxDelay)} später</li>
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

function DisplayDelayStatsUnavailabe({ stats }: { stats: UnavailableLegStats }): JSX.Element {
  const { reason } = stats as UnavailableLegStats;
  if (reason === "NO_DATA") {
    return (
      <div>
        <IonLabel>
          Keine historischen Verspätungsdaten für diesen Streckenabschnitt verfügbar.
        </IonLabel>
      </div>
    );
  }

  return (
    <div>
      <IonLabel>
        Ein Fehler ist beim Laden der historischen Verspätungsdaten aufgetreten.
      </IonLabel>
    </div>
  );

}
