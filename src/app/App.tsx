import { Button } from '../ui/button';
import { ButtonType, DefaultButtonType } from '../ui/button/types';
import styles from './index.module.scss';

function App() {

  return (
    <main className={styles.main}>
      <h1 className={styles.text}>Component</h1>
      <Button 
      appearance={ButtonType.Switcher} 
      type={DefaultButtonType.Button}/>
      <Button 
      appearance={ButtonType.Classic} 
      type={DefaultButtonType.Button}/>
    </main>
  )
}

export default App
