import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../components/Header";
import { useStats } from "../hooks/useStats";

const StatsPage: React.FC = () => {
  const stats = useStats();

  return (
    <IonPage id="content">
      <Header />
      <IonContent class="ion-padding">
        {stats.filled && (<>
          <blockquote style={{
            color: "gray",
            fontSize: "0.8em"
          }}>Stats were last refreshed at {stats.time.toLocaleString()}</blockquote>
          <h1>Lines with worst delays (all time, cumulated)</h1>
          <table width={"100%"} style={{ textAlign: "center" }}>
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
              {stats.delays.map((delay, index) =>
                <tr style={{
                  borderTop: "1px solid gray",
                  height: "4em"
                }} key={index}>
                  <td>{index + 1}</td>
                  <td style={{ borderLeft: "1px solid gray" }}>{delay.routeShortName} {delay.routeLongName}</td>
                  <td style={{ borderLeft: "1px solid gray" }}>{delay.planned.toLocaleString("de")}</td>
                  <td style={{ borderLeft: "1px solid gray" }}>{delay.estimated.toLocaleString("de")}</td>
                  <td style={{ borderLeft: "1px solid gray" }}>{delay.delay.toFixed(2)} min</td>
                </tr>)}
            </tbody>
          </table>
        </>)}
        {!stats.filled && (<p>Data analysis still in progress. Check back a little later :&#41;</p>)}
      </IonContent>
    </IonPage>
  );
};

export default StatsPage;
