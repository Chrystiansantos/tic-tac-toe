import { FiX, FiCircle } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectIcon } from '../../components/SelectIcon';
import styles from './styles.module.scss';
import { ModalComponent } from '../../components/Modal';
import { FormRoom } from '../../components/FormRoom';
import { useUserData } from '../../hooks/user';
import { api } from '../../services/api';
import { alert } from '../../hooks/alert';

export function Home() {
  const { setData } = useUserData();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState<'x' | 'o'>('x');
  const [nameRoom, setNameRoom] = useState('');
  const [roomExists, setRoomExists] = useState<boolean>(false);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    setNameRoom('');
    setRoomExists(false);
  };

  const openModalSetRoom = (roomExists_ = false) => {
    setIsOpen(true);
    if (roomExists_) {
      setRoomExists(true);
    }
  };

  const handleInitialGame = async () => {
    const dataRoom = {
      room: nameRoom,
      icon: '',
    };
    if (!roomExists) {
      dataRoom.icon = icon;
    }

    const { data } = await api.post('/room/create', dataRoom);

    if (data.success) {
      setData(nameRoom, data.icon);
      navigate('/play');
    } else {
      alert({
        type: 'error',
        message: 'Não foi possível criar sala',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FiX size="34px" fontWeight="900" color="#35C2BE" />
        <FiCircle size="34px" fontWeight="900" color="#F2B237" />
      </div>
      <div className={styles.content}>
        <strong>Pick player is mask</strong>

        <SelectIcon setIcon={setIcon} value={icon} />

        <a href="https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v">
          Frontend Mentor
        </a>
      </div>
      <div className={styles.signInContainer}>
        <button
          type="button"
          onClick={() => openModalSetRoom(false)}
          className={styles.newGame}
        >
          New game
        </button>
        <button
          type="button"
          onClick={() => openModalSetRoom(true)}
          className={styles.newGame}
        >
          Sign in game
        </button>
      </div>
      <ModalComponent closeModal={closeModal} isOpen={modalIsOpen}>
        <FormRoom
          cancellable={closeModal}
          initialGame={handleInitialGame}
          onChangeValue={setNameRoom}
          value={nameRoom}
        />
      </ModalComponent>
    </div>
  );
}
