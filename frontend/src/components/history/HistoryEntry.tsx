import styles from "./HistoryEntry.module.css";

export interface HistoryEntryProps {
  date: Date;
  originName: string,
  destinationName: string,
}

const HistoryEntry: React.FC<HistoryEntryProps> = (props) => (
  <div className={styles.historyEntry}>
    <div className={styles.date}>
      {props.date.toLocaleDateString()}
    </div>
    <div className={styles.row}>
      <div className={styles.origin}>
        <div className={styles.key}>
          <p>Start</p>
        </div>
        <div className={styles.value}>
          <p>{props.originName}</p>
        </div>
      </div>
      <div className={styles.destination}>
        <div className={styles.key}>
          <p>Ziel</p>
        </div>
        <div className={styles.value}>
          <p>{props.destinationName}</p>
        </div>
      </div>
    </div>
  </div>
);

export default HistoryEntry;
