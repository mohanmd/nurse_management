import logo from './logo.svg';
import './App.css';
import NurseList from './pages/NurseList';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <div className="App">
     <AppHeader />
     <NurseList />
    </div>
  );
}

export default App;
