import { IonContent, IonPage } from "@ionic/react";
import { WorstDelayEntry } from "../api";
import { Header } from "../components/Header";
import { useStats } from "../hooks/useStats";

const StatsPage: React.FC = () => {
  const stats = useStats();

  return (
      <IonPage id="content">
    <Header title="Statistiken" />
    <IonContent class="ion-padding">
      {stats.filled && (<>
        <blockquote style={{
          color: "gray",
          fontSize: "0.8em"
        }}>Stats were last refreshed at {stats.time.toLocaleString()}</blockquote>
        <h1>Worst delays in last 24 hours</h1>
        {DelayTable(stats.last24HoursDelays)}
        <h1>Worst delays in all recorded time</h1>
        {DelayTable(stats.allTimeDelays)}
      </>)}
      {!stats.filled && (<p>Data analysis still in progress. Check back a little later :&#41;</p>)}
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
        <th>Place</th>
        <th>Route</th>
        <th>Delay</th>
        <th>Planned</th>
        <th>Estimated</th>
      </tr>
    </thead>
    <tbody>
      {stats.map((delay, index) => <tr style={{
        borderTop: "1px solid gray",
        height: "4em"
      }} key={index}>
        <td>{index + 1}</td>
        <td style={{ borderLeft: "1px solid gray" }}>{delay.routeShortName} {delay.routeLongName}</td>
        <td style={{ borderLeft: "1px solid gray" }}>{(delay.delay / 60).toFixed(2)}h ({delay.delay.toFixed(2)}min)</td>
        <td style={{ borderLeft: "1px solid gray" }}>{delay.planned.toLocaleString("de")}</td>
        <td style={{ borderLeft: "1px solid gray" }}>{delay.estimated.toLocaleString("de")}</td>
      </tr>)}
    </tbody>
  </table>;
}

export default StatsPage;
