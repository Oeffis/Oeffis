import { IonButton, IonIcon } from "@ionic/react";
import styles from "./Button.module.css";

type ButtonProps = React.ComponentProps<typeof IonButton> & {
  icon?: string;
};

export const Button = (props: ButtonProps): JSX.Element => {
  let iconPos: string = "";
  if(props.title) {
    iconPos = "start";
  }
  return (
    <IonButton
      className={styles.button}
      color={props.color}
      disabled={props.disabled}
      expand={props.expand}
      fill={props.fill}
      strong={props.strong}
      onClick={props.onClick}
    >{props.title}
    {props.icon && <IonIcon slot={iconPos} icon={props.icon}/>}
  </IonButton>
  );
};
