import { FiCircle, FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

type IBoardData = 'x' | 'o' | '';

interface IBoard {
  dataBoard: IBoardData[];
  checkBoard: (position: number, icon: IBoardData) => void;
  disabled: boolean;
}

export function Board({ dataBoard, checkBoard, disabled }: IBoard) {
  return (
    <div className={styles.container}>
      {dataBoard.map((el, i) =>
        // eslint-disable-next-line no-nested-ternary
        el === '' ? (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            key={String(i)}
            onClick={() => checkBoard(i, 'x')}
            disabled={disabled}
          />
        ) : el === 'x' ? (
          <button key={String(i)} type="button" disabled>
            <FiX color="#35C2BE" size="60%" />
          </button>
        ) : (
          <button key={String(i)} type="button" disabled>
            <FiCircle color="#F2B237" size="60%" />
          </button>
        ),
      )}
    </div>
  );
}
