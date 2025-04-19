import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Test from './pages/Test';
import JobApplicationForm from './pages/Home';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<JobApplicationForm />} />
        <Route path="/api" element={<Test />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
