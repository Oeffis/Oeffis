import { CancellationStat, CancellationStatStatusEnum, DelayStats, DelayStatsStatusEnum, LegStats } from "../api";

export function DisplayLegDelayStats({ stats, destinationName, originName }: {
  stats: LegStats,
  destinationName: string,
  originName: string
}): JSX.Element {

  let delayStats: JSX.Element;
  if (stats.destinationDelayStats.status === DelayStatsStatusEnum.Available
    || stats.originDelayStats.status === DelayStatsStatusEnum.Available) {
    const delayStatsBulletPoints: JSX.Element[] = [];

    if (stats.destinationDelayStats.status === DelayStatsStatusEnum.Available) {
      const { averageDelay, maxDelay } = stats.destinationDelayStats as DelayStats;

      delayStatsBulletPoints.push(
        <li key="dest_averageDelay">
          Ist durchschnittlich {formatToMinutesToHumanReadableString(averageDelay)} später in {destinationName}.
        </li>
      );
      delayStatsBulletPoints.push(
        <li key="dest_maxDelay">
          Ist maximal {formatToMinutesToHumanReadableString(maxDelay)} später in {destinationName}.
        </li>
      );
    } else {
      delayStatsBulletPoints.push(
        <li key="dest_unavailable">
          Verspätungsdaten zum Ziel {destinationName} nicht verfügbar.
        </li>
      );
    }

    if (stats.originDelayStats.status === DelayStatsStatusEnum.Available) {
      const { averageDelay, maxDelay } = stats.originDelayStats as DelayStats;

      delayStatsBulletPoints.push(
        <li key="origin_averageDelay">
          Fährt durchschnittlich {formatToMinutesToHumanReadableString(averageDelay)} später bei {originName} ab.
        </li>
      );
      delayStatsBulletPoints.push(
        <li key="origin_maxDelay">
          Fährt maximal {formatToMinutesToHumanReadableString(maxDelay)} später bei {originName} ab.
        </li>
      );
    } else {
      delayStatsBulletPoints.push(
        <li key="origin_unavailable">
          Verspätungsdaten vom Start {originName} nicht verfügbar.
        </li>
      );
    }

    delayStats = <div><p>Historischen Verspätungsdaten der letzten zwei Wochen:</p>
      <ul>{delayStatsBulletPoints}</ul>
    </div>;

  } else {
    delayStats = <p>Keine historischen Verspätungsdaten für diesen Streckenabschnitt verfügbar.</p>;

  }

  const { cancellationProbability, cancellationAtDowTimeProbability } = stats.cancellationStat as CancellationStat;
  let cancellationStats: JSX.Element;
  if (stats.cancellationStat.status === CancellationStatStatusEnum.Available) {
    cancellationStats =
      <li key="cancellation_prob">
        Ausfallquote gewählter Wochentag +
        Uhrzeit: {Math.round(cancellationAtDowTimeProbability * 100)}{"%"} (allgemein: {Math.round(cancellationProbability * 100)}{"%"}).
      </li>;

  } else {
    cancellationStats = <p>Keine historischen Ausfalldaten für diesen Streckenabschnitt verfügbar.</p>;

  }

  return (
    <div>
      {delayStats}
      {cancellationStats}
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
