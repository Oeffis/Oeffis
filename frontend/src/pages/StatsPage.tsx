import { IonContent, IonPage } from "@ionic/react";
import { WorstDelayEntry } from "../api";
import { Header } from "../components/Header";
import { useStats } from "../hooks/useStats";

const StatsPage: React.FC = () => {
  const stats = useStats();

  return (
    <IonPage id="main-content">
      <Header title="Statistiken" />
      <IonContent class="ion-padding">
        {stats.filled && (<>
          <span style={{
            color: "gray",
            fontSize: "0.8em"
          }}>Letzte Aktualisierung: {stats.time.toLocaleString()}</span>
          <h1>Größte Verspätungen der letzten 24 Stunden</h1>
          {DelayTable(stats.last24HoursDelays)}
          <h1>Größte Verspätungen in der gesamten Aufzeichnungsdauer</h1>
          {DelayTable(stats.allTimeDelays)}
        </>)}
        {!stats.filled && (<p>Datenanalyse noch im Gange. Bitte schau in ein paar Minuten nochmal vorbei. :&#41;</p>)}
      </IonContent>
    </IonPage >
  );
};

function DelayTable(stats: WorstDelayEntry[]): JSX.Element {
  return <table width={"100%"} style={{ textAlign: "center" }}>
    <thead style={{
      backgroundColor: "#439468",
      height: "3em",
      fontSize: "1.3em"
    }}>
      <tr>
        <th style={{ padding: "0.5em", color: "white" }}>Rang</th>
        <th style={{ padding: "0.5em", color: "white" }}>Route</th>
        <th style={{ padding: "0.5em", color: "white" }}>Verspätung</th>
        <th style={{ padding: "0.5em", color: "white" }}>Geplante Abfahrtszeit</th>
        <th style={{ padding: "0.5em", color: "white" }}>Erfasste Abfahrtszeit</th>
      </tr>
    </thead>
    <tbody>
      {stats.map((delay, index) => <tr style={{
        borderTop: "1px solid gray",
        height: "4em"
      }} key={index}>
        <td>{index + 1}</td>
        <td style={{ borderLeft: "1px solid gray" }}>Linie {delay.routeShortName} über {delay.routeLongName.split("-").map(s => s.trim()).join(", ")}</td>
        <td style={{ borderLeft: "1px solid gray" }}>{(delay.delay / 60).toFixed(2)}h ({delay.delay.toFixed(2)}min)</td>
        <td style={{ borderLeft: "1px solid gray" }}>{delay.planned.toLocaleString("de")}</td>
        <td style={{ borderLeft: "1px solid gray" }}>{delay.estimated.toLocaleString("de")}</td>
      </tr>)}
    </tbody>
  </table>;
}

export default StatsPage;
