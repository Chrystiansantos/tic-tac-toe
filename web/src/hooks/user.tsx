import { createContext, ReactNode, useContext, useState } from 'react';

type IIcon = 'x' | 'o';

interface IUserDataContext {
  room: string;
  selectIcon: IIcon;
  setData: (roomSelect: string, iconSelect: IIcon) => void;
}
interface iUserDataProvider {
  children: ReactNode;
}

const UserDataContext = createContext<IUserDataContext>({} as IUserDataContext);

function UserDataProvider({ children }: iUserDataProvider) {
  const [room, setRoom] = useState('');
  const [icon, setIcon] = useState<IIcon>('x');

  function setData(roomSelect: string, iconSelect: IIcon) {
    setRoom(roomSelect);
    setIcon(iconSelect);
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserDataContext.Provider value={{ room, selectIcon: icon, setData }}>
      {children}
    </UserDataContext.Provider>
  );
}

function useUserData() {
  return useContext(UserDataContext);
}

export { useUserData, UserDataProvider };
