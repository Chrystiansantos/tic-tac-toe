import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

interface IWinnerProps {
  closeModal: () => void;
  nextRound: () => void;
  messageFinish: string;
}

export function Winner({ closeModal, nextRound, messageFinish }: IWinnerProps) {
  return (
    <div className={styles.container}>
      <h1>{messageFinish}</h1>
      <span>
        <FiX />
        {messageFinish}
      </span>
      <div className={styles.buttonContainer}>
        <button onClick={closeModal} className={styles.quit} type="button">
          Quit
        </button>
        <button onClick={nextRound} className={styles.next} type="button">
          Next round
        </button>
      </div>
    </div>
  );
}
