// BrowserRouter which wraps everywhere we want to use the Router (this surrounds everything that needs to use the Routing System)
// the Routes component which wraps all of our individual Routes
// the Route component to create a single Route
// the Navigate component redirects a User
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Components
import Header from './components/Header';

const App = () => {
  // we get the user from the Global State AuthContext
  const {
    state: { user },
  } = useAuthContext();

  return (
    <div className="App">
      {/* this BrowserRouter wraps */}
      <BrowserRouter>
        <Header />
        {/* this "pages" div container is where the Routes are loaded with the Link to= */}
        <div className="pages">
          <Routes>
            {/* the Route component needs two props, the path of the route, the element that we want to render for this route.. so for the / path the Home Component is being Rendered */}
            {/* the Navigate component takes a to= which is where you want to redirect to */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
