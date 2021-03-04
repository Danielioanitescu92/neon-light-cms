import React,{ useEffect } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar'
import RoutesNav from './components/RoutesNav'
import Footer from './components/Footer'
import PostPage from './components/PostPage'
import EditPage from './components/EditPage'
import ChangePass from './components/ChangePass'
import EditProfile from './components/EditProfile'
import ResetPass from './components/ResetPass'
import ConfirmAccount from './components/ConfirmAccount'
import PostsList from './components/PostsList'
import MyAccount from './components/MyAccount'
import UsersList from './components/UsersList'
import SubsList from './components/SubsList'
import PrivacyPolicies from './components/PrivacyPolicies'
import TermsConds from './components/TermsConds'
import Settings from './components/Settings'
import BlogPP from './components/BlogPP'
import BlogTAC from './components/BlogTAC'
import ContactDev from './components/ContactDev'
import EditPP from './components/EditPP'
import EditTAC from './components/EditTAC'
import BlogAbout from './components/BlogAbout'
import EditAbout from './components/EditAbout'
import ContactAdmin from './components/ContactAdmin'
import AddPost from './components/AddPost'
import Dashboard from './components/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [store.dispatch])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar/>
          <RoutesNav/>
          <Switch>
            
            {/* <Route path="/section/(page)?/:page?/(sort)?/:sort?" component={Section} /> */}

            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route path="/addpost" component={AddPost} />

            <Route path="/myaccount" exact component={MyAccount} />
            <Route path="/myaccount/page/:page" exact component={MyAccount} />
            <Route path="/myaccount/sort/:sort" exact component={MyAccount} />
            <Route path="/myaccount/search/:search" exact component={MyAccount} />
            <Route path="/myaccount/page/:page/sort/:sort" exact component={MyAccount} />
            <Route path="/myaccount/search/:search/page/:page" exact component={MyAccount} />
            <Route path="/myaccount/search/:search/sort/:sort" exact component={MyAccount} />
            <Route path="/myaccount/search/:search/page/:page/sort/:sort" exact component={MyAccount} />

            <Route path="/search/:search" exact component={PostsList} />
            <Route path="/search/:search/page/:page" exact component={PostsList} />
            <Route path="/search/:search/sort/:sort" exact component={PostsList} />
            <Route path="/search/:search/page/:page/sort/:sort" exact component={PostsList} />
            <Route path="/search/:search/author/:author" exact component={PostsList} />
            <Route path="/search/:search/author/:author/sort/:sort" exact component={PostsList} />
            <Route path="/search/:search/author/:author/page/:page" exact component={PostsList} />
            <Route path="/search/:search/author/:author/page/:page/sort/:sort" exact component={PostsList} />

            <Route path="/confirmAccount/:token" component={ConfirmAccount} />
            <ProtectedRoute path="/editabout/:id" component={EditAbout} />
            <ProtectedRoute path="/edit/:id" component={EditPage} />
            <ProtectedRoute path="/edittc/:id" component={EditTAC} />
            <ProtectedRoute path="/editpp/:id" component={EditPP} />
            <Route path="/contact admin" component={ContactAdmin} />
            <ProtectedRoute path="/settings/about us" component={BlogAbout} />
            <ProtectedRoute path="/settings/contact developer" component={ContactDev} />
            <ProtectedRoute path="/settings/blog privacy policies" exact component={BlogPP} />
            <ProtectedRoute path="/settings/blog terms and conditions" exact component={BlogTAC} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/termsandconditions" component={TermsConds} />
            <Route path="/privacypolicies" component={PrivacyPolicies} />

            <Route path="/" exact component={PostsList} />
            <Route path="/page/:page" exact component={PostsList} />
            <Route path="/sort/:sort" exact component={PostsList} />
            <Route path="/page/:page/sort/:sort" exact component={PostsList} />
            <Route path="/author/:author" exact component={PostsList} />
            <Route path="/author/:author/sort/:sort" exact component={PostsList} />
            <Route path="/author/:author/page/:page" exact component={PostsList} />
            <Route path="/author/:author/page/:page/sort/:sort" exact component={PostsList} />
            
            <ProtectedRoute path="/users" exact component={UsersList} />
            <ProtectedRoute path="/users/rl/:rl" exact component={UsersList} />
            <ProtectedRoute path="/users/page/:page" exact component={UsersList} />
            <ProtectedRoute path="/users/sort/:sort" exact component={UsersList} />
            <ProtectedRoute path="/users/search/:search" exact component={UsersList} />
            <ProtectedRoute path="/users/page/:page/sort/:sort" exact component={UsersList} />
            <ProtectedRoute path="/users/search/:search/page/:page" exact component={UsersList} />
            <ProtectedRoute path="/users/search/:search/sort/:sort" exact component={UsersList} />
            <ProtectedRoute path="/users/search/:search/rl/:rl" exact component={UsersList} />
            <ProtectedRoute path="/users/rl/:rl/page/:page" exact component={UsersList} />
            <ProtectedRoute path="/users/rl/:rl/sort/:sort" exact component={UsersList} />
            <ProtectedRoute path="/users/search/:search/page/:page/sort/:sort" exact component={UsersList} />
            <ProtectedRoute path="/users/search/:search/rl/:rl/sort/:sort" exact component={UsersList} />
            <ProtectedRoute path="/users/search/:search/rl/:rl/page/:page" exact component={UsersList} />
            <ProtectedRoute path="/users/rl/:rl/page/:page/sort/:sort" exact component={UsersList} />            
            <ProtectedRoute path="/users/search/:search/rl/:rl/page/:page/sort/:sort" exact component={UsersList} />
            
            <ProtectedRoute path="/subslist" exact component={SubsList} />
            <ProtectedRoute path="/subslist/page/:page" exact component={SubsList} />
            <ProtectedRoute path="/subslist/sort/:sort" exact component={SubsList} />
            <ProtectedRoute path="/subslist/search/:search" exact component={SubsList} />
            <ProtectedRoute path="/subslist/page/:page/sort/:sort" exact component={SubsList} />
            <ProtectedRoute path="/subslist/search/:search/page/:page" exact component={SubsList} />
            <ProtectedRoute path="/subslist/search/:search/sort/:sort" exact component={SubsList} />
            <ProtectedRoute path="/subslist/search/:search/page/:page/sort/:sort" exact component={SubsList} />

            <Route path="/changepass/:id" component={ChangePass} />
            <Route path="/editprofile/:id" component={EditProfile} />
            <Route path="/resetPass/:token" component={ResetPass} />
            <Route path="/post/:id" component={PostPage} />

          </Switch>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
