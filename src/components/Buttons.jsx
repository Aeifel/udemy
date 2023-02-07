import styles from "../styles/Buttons.module.css"
export const ExpandHoverBtn = (props) => {
  const { backgroundColor, color, onClickEvent, text } = props;
  console.log(text);
  return (
    <button
      class="btn-9"
      className={styles.hoverBtn}
      onClick={(e) => onClickEvent(e)}
    //   style={{
    //     color: color,
    //     backgroundColor: backgroundColor,
    //   }}
    >
      <span>{text}</span>
    </button>
  );
};
export const PressBtn = (props) => {
  const { backgroundColor, color, onClickEvent, text } = props;
  return (
    <button className={styles.pressBtn} role="button">
      {text}
    </button>
  );
};
