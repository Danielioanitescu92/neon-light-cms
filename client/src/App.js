import React,{ useEffect } from 'react';

import AppNavbar from './components/pages/navs/AppNavbar'
import RoutesNav from './components/pages/navs/RoutesNav'
import Footer from './components/pages/footer/Footer'
import PostPage from './components/pages/post/PostPage'
import EditPage from './components/pages/post/EditPage'
import ChangePass from './components/pages/myaccount/ChangePass'
import EditProfile from './components/pages/myaccount/EditProfile'
import ResetPass from './components/pages/login/ResetPass'
import ConfirmAccount from './components/pages/login/ConfirmAccount'
import PostsList from './components/pages/home/PostsList'
import MyAccount from './components/pages/myaccount/MyAccount'
import UsersList from './components/pages/users/UsersList'
import SubsList from './components/pages/subs/SubsList'
import PrivacyPolicies from './components/pages/footer/PrivacyPolicies'
import TermsConds from './components/pages/footer/TermsConds'
import Settings from './components/pages/settings/Settings'
import BlogPP from './components/pages/settings/blogpp/BlogPP'
import BlogTAC from './components/pages/settings/blogtac/BlogTAC'
import ContactDev from './components/pages/settings/contact/ContactDev'
import EditPP from './components/pages/settings/blogpp/EditPP'
import EditTAC from './components/pages/settings/blogtac/EditTAC'
import BlogAbout from './components/pages/settings/blogab/BlogAbout'
import EditAbout from './components/pages/settings/blogab/EditAbout'
import ContactAdmin from './components/pages/settings/contact/ContactAdmin'
import AddPost from './components/pages/home/AddPost'
import Dashboard from './components/pages/dashboard/Dashboard'
import { ProtectedRoute } from './components/functionals/ProtectedRoute'
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
        <div>
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
