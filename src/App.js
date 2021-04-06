import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import { loadProfile, getTags, getSizeTags } from './redux/actions/profile';
import { loadAllClubs } from './redux/actions/catalog';
import { Provider } from 'react-redux';
import store from './redux/store';

import PrivateRoute from './utils/PrivateRoute';

import { Landing } from './pages/landing/Landing.js';
import { ComingSoon } from './pages/comingSoon/ComingSoon.js';
import Catalog from './pages/catalog/Catalog.js';
import { SignUp } from './pages/clubLogin/ClubRegister.js';
import { SignIn } from './pages/clubLogin/ClubLogin.js';
import { ResetPassword } from './pages/clubLogin/ResetPassword.js';
import { ResetPassword2 } from './pages/clubLogin/ResetPassword2.js';
import Security from './pages/admin/security/Security.js';
import ErrorPage from './pages/error/ErrorPage';
import AboutPage from './pages/about/AboutPage';
import Admin from './pages/admin/admin/Admin.js';
import ClubPage from './pages/club/ClubPage';
import Dashboard from './pages/student/Dashboard';
import Favorites from './pages/student/Favorites.js';
import ContactUs from './components/layout/contactUs/ContactUs.js';
import Navbar from './components/layout/navbar/Navbar';
import StudentSettings from './pages/student/StudentSettings.js';
import Activation from './pages/club/Activation.js';

Moment.globalTimezone = 'America/Los_Angeles';

const App = () => {
  useEffect(() => {
    store.dispatch(loadProfile());
    store.dispatch(loadAllClubs());
    store.dispatch(getTags());
    store.dispatch(getSizeTags());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={AboutPage} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/catalog" component={Catalog} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/recover" component={ResetPassword} />
          <Route exact path="/resetpassword" component={ResetPassword2} />
          <Route path="/club/:id" component={ClubPage} />
          <PrivateRoute exact path="/security" component={Security} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/FAQ" component={ComingSoon} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/student/settings" component={StudentSettings} />
          <PrivateRoute exact path="/security" component={Security} />
          <Route exact path="/activation" component={Activation} />
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
        <ContactUs />
        <NotificationContainer />
      </Router>
    </Provider>
  );
};

export default withRouter(App);
