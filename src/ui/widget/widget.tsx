import { CurrencyForm } from "../../components/currency-line/currency-line";
import styles from './widget.module.scss';
import { currencies } from "../../utils/utils";
import { Typography } from "@mui/material";
import '@fontsource/roboto/400.css';

export const CryptoWidget = () => {

    return (
      <div className={styles.widget}> 
        <Typography variant="h5" component="h1" mb={3}>Конвертировать криптовалюту</Typography>
        <CurrencyForm currencyOptions={currencies}/>
      </div>
    )
}