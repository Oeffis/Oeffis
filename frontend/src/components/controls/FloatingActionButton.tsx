import {IonFab, IonFabButton, IonIcon } from "@ionic/react";
import styles from "./FloatingActionButton.module.css";

type FloatingActionButtonProps = React.ComponentProps<typeof IonFabButton> & {
  icon?: string;
};

export const FloatingActionButton = (props: FloatingActionButtonProps): JSX.Element => 

  <IonFab className={styles.fabButtonWrapper} slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton
      color={props.color}
      disabled={props.disabled}
      onClick={props.onClick}>
      <IonIcon icon={props.icon}/>
    </IonFabButton>
  </IonFab>;
