import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Modal from 'react-modal';
import { UserDataProvider } from './hooks/user';
import { Router } from './routes';

Modal.setAppElement('#root');

export function App() {
  return (
    <UserDataProvider>
      <Router />
      <ToastContainer />
    </UserDataProvider>
  );
}
