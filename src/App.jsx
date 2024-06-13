import { useState, useEffect } from 'react'
import './App.css'
import {
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  redirect,
  createRoutesFromElements
} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import HomePage from './components/HomePage'
import Header from './components/Header'
import CompanyList from './components/CompanyList'
import CompanyDetail from './components/CompanyDetail'
import JobList from './components/JobList'
import UserProfile from './components/UserProfile'
import SearchResults from './components/SearchResults'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import UserUpdate from './components/UserUpdate'
import JoblyApi from './api/api'
import AuthContext from './AuthContext'
import RequireAuth from './RequireAuth'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [companies, setCompanies] = useState([])
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function getCompanies() {
      let companyList = await JoblyApi.getCompanies();
      setCompanies(companyList);
    }
    async function getJobs() {
      let jobList = await JoblyApi.getJobs();
      setJobs(jobList);
    }
    getJobs();
    getCompanies();
  }, [])

  useEffect(() => {
    if (token) {
      JoblyApi.token = token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      async function getUser() {
        let user = await JoblyApi.getUser(decoded.username);
        setCurrentUser(user);
      }
      getUser();
    } else {
      JoblyApi.token = null;
      localStorage.removeItem('token');
      setCurrentUser(null);
    }
  }, [token])

  const login = async (data) => {
    const token = await JoblyApi.login(data);
    JoblyApi.token = token;
    setToken(token);
    const user = await JoblyApi.getUser(data.username);
    setCurrentUser(user);
  }

  const signup = async (data) => {
    const token = await JoblyApi.signup(data);
    JoblyApi.token = token;
    setToken(token);
    const user = await JoblyApi.getUser(data.username);
    setCurrentUser(user);
  }

  const updateUser = async (data) => {
    const user = await JoblyApi.updateUser(currentUser.username, data);
    setCurrentUser(user);
  }

  const logout = () => {
    setCurrentUser(null);
    JoblyApi.token = null;
    setToken(null);
  }

  const handleApply = async (data) => {
    try {
      if (currentUser.applications.includes(data.jobId)) {
        // If the user has already applied, unapply from the job
        let removeMessage = await JoblyApi.unapplyToJob(data.username, data.jobId);
        if (removeMessage === "removed") {
          let user = await JoblyApi.getUser(data.username);
          setCurrentUser(user);
          return false;
        }
      } else {
        // If the user has not applied, apply to the job
        let message = await JoblyApi.applyToJob(data.username, data.jobId);
        if (message === "applied") {
          let user = await JoblyApi.getUser(data.username);
          setCurrentUser(user);
          return true;
        }
      }
    } catch (error) {
      console.error("Error in handleApply:", error);
      return false;
    }
  };

  const companyLoader = async ({ params }) => {
    try {
      const company = await JoblyApi.getCompany(params.handle);
      return { company, applications: [] };
    } catch (error) { 
      // console.error("Error in companyLoader:", error);
      return redirect('/companies');
    }
  }

  const userLoader = async ({ params }) => {
    const user = await JoblyApi.getUser(params.username);
    if (!user) {
      throw new Response('User not found', { status: 404 })
    }
    return user;
  }

  const queryResultsLoader = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const results = await JoblyApi.search(query);
    return results;
  }

  const applicationLoader = async ({ params }) => {
    const applications = await JoblyApi.getApplications(params.username);
    if (!applications) {
      throw new Response('Applications not found', { status: 404 })
    }
    return { company: null, applications };
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={< Header />} path='/'>
          <Route element={< Navigate to='feed' />} index />
          <Route element={< HomePage />} path='feed' />
          <Route element={< UserLogin />} path='login' />
          <Route element={< UserSignup />} path='signup' />
          <Route element={<RequireAuth>< UserUpdate /></RequireAuth>} path='users/:username/edit' />
          <Route element={<RequireAuth>< CompanyList companies={companies} /></RequireAuth>} path='companies' />
          <Route
            element={<RequireAuth>< CompanyDetail /></RequireAuth>}
            path='companies/:handle'
            loader={companyLoader}
          >
            <Route element={< JobList />} path='jobs' loader={companyLoader} />
          </Route>
          <Route element={<RequireAuth>< JobList jobs={jobs} /></RequireAuth>} path='jobs' />
          <Route element={<RequireAuth>< UserProfile /></RequireAuth>} path='users/:username' loader={userLoader}>
            <Route element={< JobList />} path='applications' loader={applicationLoader} />
          </Route>
          <Route element={<RequireAuth>< SearchResults /></RequireAuth>} path='search/results' loader={queryResultsLoader} />
          <Route element={< Navigate to='feed' />} path='*' />
        </Route>
      </>
    )
  );

  return (
    <div className='App'>
      <AuthContext.Provider value={{ currentUser, login, signup, updateUser, logout, handleApply }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App