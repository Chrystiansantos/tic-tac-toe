import styles from './styles.module.scss';

interface IFormRoom {
  value: string;
  onChangeValue: (data: string) => void;
  cancellable: () => void;
  initialGame: () => void;
}

export function FormRoom({
  cancellable,
  initialGame,
  onChangeValue,
  value,
}: IFormRoom) {
  return (
    <div className={styles.container}>
      <h1>Name room</h1>
      <input
        type="text"
        value={value}
        onChange={e => onChangeValue(e.target.value)}
        placeholder="Insert or create name of room"
      />

      <div>
        <button onClick={initialGame} type="button">
          Sign in
        </button>
        <button onClick={cancellable} type="button">
          Cancell
        </button>
      </div>
    </div>
  );
}
