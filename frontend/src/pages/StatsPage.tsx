import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/OeffisLogo1.svg";
import { useStats } from "../hooks/useStats";

const StatsPage: React.FC = () => {
  const stats = useStats();

  return (<IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          <h3>Stats</h3>
        </IonTitle>
        <IonButtons slot="end">
          <IonImg className="menuLogo" src={logo} />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
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
  </IonPage >);
};

export default StatsPage;
