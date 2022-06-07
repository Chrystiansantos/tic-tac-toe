import { FiX, FiCircle } from 'react-icons/fi';
import styles from './styles.module.scss';

type icon = 'x' | 'o';

interface ISelectIconProps {
  value: icon;
  setIcon: (icon_: icon) => void;
}

export function SelectIcon({ value, setIcon }: ISelectIconProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIcon('x')}
        className={value === 'x' ? styles.select : ''}
      >
        <FiX
          size="24px"
          fontWeight="900"
          color={value === 'x' ? '#192B32' : '#A8BEC9'}
        />
      </button>

      <button
        type="button"
        onClick={() => setIcon('o')}
        className={value === 'o' ? styles.select : ''}
      >
        <FiCircle
          size="24px"
          fontWeight="900"
          color={value === 'o' ? '#192B32' : '#A8BEC9'}
        />
      </button>
    </div>
  );
}
