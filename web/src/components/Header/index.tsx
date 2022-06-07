import { FiCircle, FiRotateCw, FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

type IBoard = 'x' | 'o';

interface IHeaderProps {
  setOpenModalRestar: () => void;
  room: string;
  iconSelect: IBoard;
}

export function Header({ setOpenModalRestar, iconSelect, room }: IHeaderProps) {
  return (
    <div className={styles.container}>
      <div>
        {iconSelect === 'x' && (
          <FiX size="32px" fontWeight="900" color="#35C2BE" />
        )}
        {iconSelect === 'o' && (
          <FiCircle size="32px" fontWeight="900" color="#F2B237" />
        )}
      </div>
      <div className={styles.buttonTurn}>
        <button type="button">
          {iconSelect === 'x' ? (
            <FiX size="24px" fontWeight="900" color="#A8BFC9" />
          ) : (
            <FiCircle size="24px" fontWeight="900" color="#A8BFC9" />
          )}
          <span>{room}</span>
        </button>
      </div>
      <div className={styles.buttonRefresh}>
        <button type="button" onClick={setOpenModalRestar}>
          <FiRotateCw />
        </button>
      </div>
    </div>
  );
}

export default Header;
