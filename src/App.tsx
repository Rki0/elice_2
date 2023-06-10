import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/index.scss';
import Board from './components/Board/Board';
import PostsDetail from './components/Board/PostsDetail';
import CreatePost from './components/Board/CreatePost';
import PostUpdate from './components/Board/PostUpdate';
import Reservation from 'components/Reservation';
import Main from './pages/Main';
import FloatingButton from 'components/common/FloatingButton';
import Admin from 'pages/Admin/Admin';
import AdminBooking from 'pages/Admin/AdminBooking';
import AdminBookingRacer from 'pages/Admin/AdminBookingRacer';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MyPage from 'pages/MyPage';
import MyPost from 'pages/MyPost';
import MyReservation from 'pages/MyReservation';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import AdminNotice from 'pages/Admin/AdminNotice';
import AdminBookingBlock from 'pages/Admin/AdminBookingBlock';
import EliceDirection from 'components/Direction/Direction';
import Unvalid from 'pages/Unvalid/Unvalid';
import AdminRoutes from 'routes/AdminRoutes';
import UserRoutes from 'routes/UserRoutes';
import AlreadyLoggedInRoutes from 'routes/AlreadyLoggedInRoutes';

function App() {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
    >
      <div className={'App'}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/booking' element={<AdminBooking />} />
            <Route
              path='/admin/booking/racer'
              element={<AdminBookingRacer />}
            />
            <Route
              path='/admin/booking/block'
              element={<AdminBookingBlock />}
            />
            <Route path='/admin/notice' element={<AdminNotice />} />
            <Route path='/post/free' element={<Board />} />
            <Route path='/post/free/:id' element={<PostsDetail />} />
            <Route path='/post/free/create' element={<CreatePost />} />
            <Route path='/post/free/editPost/:id' element={<PostUpdate />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/mypage/mypost' element={<MyPost />} />
            <Route path='/mypage/myreservation' element={<MyReservation />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/direction' element={<EliceDirection />} />

            {/* <Route element={<AlreadyLoggedInRoutes />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
            </Route> */}

            {/* <Route element={<UserRoutes />}>
              <Route path='/post/free/:id' element={<PostsDetail />} />
              <Route path='/post/free/create' element={<CreatePost />} />
              <Route path='/post/free/editPost/:id' element={<PostUpdate />} />
              <Route path='/reservation' element={<Reservation />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/mypage/mypost' element={<MyPost />} />
              <Route path='/mypage/myreservation' element={<MyReservation />} />
            </Route> */}

            {/* <Route element={<AdminRoutes />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/booking' element={<AdminBooking />} />
              <Route
                path='/admin/booking/racer'
                element={<AdminBookingRacer />}
              />
              <Route
                path='/admin/booking/block'
                element={<AdminBookingBlock />}
              />
              <Route path='/admin/notice' element={<AdminNotice />} />
            </Route> */}

            <Route path='/*' element={<Unvalid />} />
          </Routes>
          <Footer />
          <FloatingButton />
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
