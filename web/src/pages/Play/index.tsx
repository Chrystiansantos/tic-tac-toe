import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Board } from '../../components/Board';
import Header from '../../components/Header';
import { ModalComponent } from '../../components/Modal';
import { Reestart } from '../../components/Reestart';
import { Winner } from '../../components/Winner';
import { alert } from '../../hooks/alert';
import { useUserData } from '../../hooks/user';
import { api } from '../../services/api';
import styles from './styles.module.scss';

type IBoard = 'x' | 'o' | '';

interface IResult {
  winner: number;
  lost: number;
  ties: number;
}

const socket = io(import.meta.env.VITE_API);

export function Play() {
  const navigate = useNavigate();
  const { room, selectIcon, setData } = useUserData();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isReestart, setIsReestart] = useState(true);
  const [messageFinish, setMessageFinish] = useState<string>('');
  const [board, setBoard] = useState<IBoard[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [result, setResult] = useState<IResult>({
    lost: 0,
    ties: 0,
    winner: 0,
  });

  useEffect(() => {
    socket.on(room, data => {
      if (data === 'layerIsOn') {
        alert({ type: 'success', message: 'Rival is on' });
        setDisabledButton(false);
      }
      if (data.nextPlay === selectIcon) {
        alert({ type: 'success', message: 'Está na hora de voce jogar' });
        setDisabledButton(false);
      }
      if (data.event === 'updateBoard') {
        setBoard(data.board);
      }
      if (data.event === 'winner') {
        if (data.winner === selectIcon) {
          setMessageFinish('you, won!');
        } else {
          setMessageFinish('you, lost!');
        }
        setModalIsOpen(true);
        setIsReestart(false);

        setResult({
          winner: data.winnerX,
          lost: data.winnerO,
          ties: data.ties,
        });
      }
      if (data.event === 'tie') {
        setResult({
          ...result,
          ties: data.ties,
        });
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        nextRound();
      }
    });
    return () => {
      socket.off();
    };
  }, [room, result]);

  function openModal() {
    setModalIsOpen(true);
  }

  const openModalRestart = () => {
    setIsReestart(true);
    openModal();
  };

  const restartGame = async () => {
    await api.delete(`/room/delete/${room}`);
    setData('', 'x');
    navigate('/');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsReestart(false);
    if (!isReestart) restartGame();
  };

  const handleSelectBoard = (position: number, icon: IBoard) => {
    const boardChanged = board.map((el, i) =>
      i === position ? selectIcon : el,
    );
    setBoard(boardChanged);
    setDisabledButton(true);
    api.post('/board/moviment-board', {
      boardChanged,
      room,
      player: selectIcon,
    });
  };

  const nextRound = async () => {
    api.post('/board/moviment-board', {
      boardChanged: ['', '', '', '', '', '', '', '', ''],
      room,
      player: selectIcon,
      changedNextPlayer: true,
    });
    setModalIsOpen(false);
    setIsReestart(false);
  };

  return (
    <div className={styles.container}>
      <Header
        room={room}
        iconSelect={selectIcon}
        setOpenModalRestar={openModalRestart}
      />

      <Board
        dataBoard={board}
        checkBoard={handleSelectBoard}
        disabled={disabledButton}
      />

      <ModalComponent closeModal={closeModal} isOpen={modalIsOpen}>
        {isReestart ? (
          <Reestart restartGame={restartGame} closeModal={closeModal} />
        ) : (
          <Winner
            closeModal={closeModal}
            messageFinish={messageFinish}
            nextRound={nextRound}
          />
        )}
      </ModalComponent>
      <div className={styles.buttonFooter}>
        <button type="button">
          {selectIcon === 'x' ? 'X (you)' : 'X (rival)'}
          <strong>{result.winner}</strong>
        </button>
        <button type="button">
          Ties
          <strong>{result.ties}</strong>
        </button>
        <button type="button">
          {selectIcon === 'o' ? 'O (you)' : 'O (rival)'}
          <strong>{result.lost}</strong>
        </button>
      </div>
    </div>
  );
}
