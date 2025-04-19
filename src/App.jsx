import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Test from './pages/Test';
import JobApplicationForm from './pages/Home';
import JobApplicationList from './pages/Application';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<JobApplicationForm />} />
        <Route path="/applications" element={<JobApplicationList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
