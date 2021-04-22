import './App.css';
import RegistrationForm from './components/RegistrationForm'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const App = () => {
  return (
    <div className="App">
      <RegistrationForm />
      <NotificationContainer />
    </div>
  );
}

export default App;
