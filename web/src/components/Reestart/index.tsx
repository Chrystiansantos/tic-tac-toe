import styles from './styles.module.scss';

interface IRestartProps {
  closeModal: () => void;
  restartGame: () => void;
}

export function Reestart({ closeModal, restartGame }: IRestartProps) {
  return (
    <div className={styles.container}>
      <h1>Restart game</h1>
      <div>
        <button type="button" onClick={closeModal}>
          No, cancel
        </button>
        <button type="button" onClick={restartGame}>
          Yes, restart
        </button>
      </div>
    </div>
  );
}
