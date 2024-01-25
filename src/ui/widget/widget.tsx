import { Input } from "../input/input";
import styles from './widget.module.scss';

export const CryptoWidget = () => {
    return (
        <div className={styles.widget}>
            <Input/>
            <Input/>
        </div>
    )
}