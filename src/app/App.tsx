import { Switcher } from '../ui/switcher/switcher';
import styles from './index.module.scss';
import { ThemeType } from '../types/types';
import useLocalStorage from 'use-local-storage';
import { CryptoWidget } from '../ui/widget/widget';

function App() {
  const [ligthTheme, setTheme] = useLocalStorage('isLight', false);
  const toggleTheme = () => {
    setTheme(!ligthTheme);
  }

  return (
    <main className={styles.main} app-theme={ligthTheme ? ThemeType.Light : ThemeType.Dark}>
      <Switcher 
      theme={ligthTheme} 
      handleChange={toggleTheme}/>
      <CryptoWidget />
    </main>
  )
}

export default App
