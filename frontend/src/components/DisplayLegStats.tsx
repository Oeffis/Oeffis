import { IonIcon } from "@ionic/react";
import {
  arrowRedoOutline,
  calendarOutline,
  closeCircleOutline,
  flagOutline,
  reloadOutline,
  timerOutline
} from "ionicons/icons";
import { CancellationStatStatusEnum, DelayStatsStatusEnum, LegStats, LegStatsCancellationStat } from "../api";
import styles from "./DisplayLegStats.module.css";

export function DisplayLegStats({ stats, destinationName, originName }: {
  stats: LegStats,
  destinationName: string,
  originName: string
}): JSX.Element {

  return (
    <div>
      <div>
        <p><IonIcon icon={timerOutline}/> Verspätungsquote: {renderDelayStatsSummary(stats)}</p>
        {renderDelayStatsDetails(stats, originName, destinationName)}
      </div>
      <div>
        <p><IonIcon icon={closeCircleOutline}/>Ausfallquote: {renderCancellationStatSummary(stats.cancellationStat)}</p>
        {renderCancellationStatDetails(stats.cancellationStat, originName, destinationName)}
      </div>
    </div>
  );
}

function renderDelayStatsSummary(stats: LegStats): JSX.Element {
  const originSummary = stats.originDelayStats.status === DelayStatsStatusEnum.Available
    ? formatToDelayMinutesString(stats.originDelayStats.averageDelay)
    : "n.a.";
  const destinationSummary = stats.destinationDelayStats.status === DelayStatsStatusEnum.Available
    ? formatToDelayMinutesString(stats.destinationDelayStats.averageDelay)
    : "n.a.";

  return (<span>
    <IonIcon icon={arrowRedoOutline}/> {originSummary} | <IonIcon icon={flagOutline}/> {destinationSummary}
  </span>);
}

function renderDelayStatsDetails(stats: LegStats, originName: string, destinationName: string): JSX.Element {
  let details: JSX.Element;

  if (stats.destinationDelayStats.status === DelayStatsStatusEnum.Unavailable
    && stats.originDelayStats.status === DelayStatsStatusEnum.Unavailable) {
    details = <span>"Keine historischen Verspätungsdaten für diesen Streckenabschnitt verfügbar."</span>;

  } else {
    const bulletPoints: JSX.Element[] = [];

    if (stats.originDelayStats.status === DelayStatsStatusEnum.Available) {
      bulletPoints.push(
        <li key="orig_details">
          Abfahrt durchschnittlich {formatToMinutesToHumanReadableString(stats.originDelayStats.averageDelay)},
          maximal {formatToMinutesToHumanReadableString(stats.originDelayStats.maxDelay)} später in {originName}.
        </li>
      );
    }
    if (stats.destinationDelayStats.status === DelayStatsStatusEnum.Available) {
      bulletPoints.push(
        <li key="dest_details">
          Ankunft durchschnittlich {formatToMinutesToHumanReadableString(stats.destinationDelayStats.averageDelay)},
          maximal {formatToMinutesToHumanReadableString(stats.destinationDelayStats.maxDelay)} später
          in {destinationName}.
        </li>
      );
    }

    details = (<span><ul>{bulletPoints}</ul>
        <p className={styles.stats_data_basis}>Grundlage sind historische Verspätungsdaten der letzten zwei Wochen.</p></span>
    );
  }

  return (<span className={styles.stats_details}>{details}</span>);
}

function renderCancellationStatSummary(stat: LegStatsCancellationStat): JSX.Element {
  const dowTimeProb = stat.status === CancellationStatStatusEnum.Available
    ? formatToProbabilityString(stat.cancellationAtDowTimeProbability)
    : "n.a.";

  const generalProb = stat.status === CancellationStatStatusEnum.Available
    ? formatToProbabilityString(stat.cancellationProbability)
    : "n.a.";

  return (<span>
    <IonIcon icon={calendarOutline}/> {dowTimeProb} | <IonIcon icon={reloadOutline}/> {generalProb}
  </span>);
}

function renderCancellationStatDetails(
  stat: LegStatsCancellationStat,
  originName: string,
  destinationName: string
): JSX.Element {
  let details: JSX.Element;

  if (stat.status === CancellationStatStatusEnum.Unavailable) {
    details = <span>"Keine historischen Ausfalldaten für diesen Streckenabschnitt verfügbar."</span>;

  } else {
    const bulletPoints: JSX.Element[] = [];
    bulletPoints.push(
      <li key="dowTime_details">
        Ausfall an gewähltem Wochentag und Uhrzeit
        in {formatToProbabilityToHumanReadableString(stat.cancellationAtDowTimeProbability)} der Fälle auf
        Teilstrecke von {originName} nach {destinationName}.
      </li>
    );
    bulletPoints.push(
      <li key="general_details">
        Ausfall generell (alle Wochentage und Uhrzeiten)
        in {formatToProbabilityToHumanReadableString(stat.cancellationProbability)} der Fälle auf
        Teilstrecke von {originName} nach {destinationName}.
      </li>
    );

    details = (<span><ul>{bulletPoints}</ul>
        <p
          className={styles.stats_data_basis}>Grundlage sind historische Ausfalldaten der letzten acht Wochen.</p></span>
    );

  }

  return (<span className={styles.stats_details}>{details}</span>);
}

function formatToDelayMinutesString(minutes: number): string {
  const fullMinutes = Math.round(minutes);

  return fullMinutes > 0
    ? "+" + fullMinutes + " Min"
    : fullMinutes + " Min";
}

function formatToProbabilityString(probability: number): string {
  const roundedProbability = Math.round(probability * 100);
  return roundedProbability + "%";
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

function formatToProbabilityToHumanReadableString(probability: number): string {
  if ((probability * 100) < 1) {
    return "weniger als ein Prozent";
  }

  const roundedProbability = Math.round(probability * 100);
  if (roundedProbability === 1) {
    return "ca. ein Prozent";
  }

  return `ca. ${roundedProbability} Prozent`;
}
