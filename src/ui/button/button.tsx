import { ButtonType, DefaultButtonType } from "./types"
import styles from './button.module.scss';

interface ButtonPropsType {
    appearance: ButtonType,
    type: DefaultButtonType,
    text?: string,
}

export const Button = ({ appearance, type, text }:ButtonPropsType) => {
    const styleName = `button_${appearance}`;
    return (
        appearance === ButtonType.Switcher
        ? <button className={styles[styleName]} type={type}></button>
        : <button className={styles[styleName]} type={type}>{text}</button>
    )
}