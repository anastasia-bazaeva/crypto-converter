import styles from './switcher.module.scss';

interface SwitcherPropTypes {
    handleChange: () => void,
    theme: boolean
}

export const Switcher = ({ handleChange, theme }:SwitcherPropTypes) => {
    return (
        <div className={styles.toggle}>
            <input
            className={styles.toggle__input}
            onChange={handleChange}
            type='checkbox'
            id='check'
            checked={theme}/>
            <label htmlFor='check'>Сменить тему</label>
        </div>
    )
}