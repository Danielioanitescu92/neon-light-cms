import React,{ useEffect } from 'react';
// import styles from './index.module.css'

// import AppNavbar from './components/pages/navs/AppNavbar'
// import RoutesNav from './components/pages/navs/RoutesNav'
// import Footer from './components/pages/footer/Footer'
// import PostPage from './components/pages/post/PostPage'
// import EditPage from './components/pages/post/EditPage'
// import ChangePass from './components/pages/myaccount/ChangePass'
// import EditProfile from './components/pages/myaccount/EditProfile'
// import ResetPass from './components/pages/login/ResetPass'
// import ConfirmAccount from './components/pages/login/ConfirmAccount'
// import PostsList from './components/pages/home/PostsList'
// import MyAccount from './components/pages/myaccount/MyAccount'
// import UsersList from './components/pages/users/UsersList'
// import SubsList from './components/pages/subs/SubsList'
// import PrivacyPolicies from './components/pages/footer/PrivacyPolicies'
// import TermsConds from './components/pages/footer/TermsConds'
// import Settings from './components/pages/settings/Settings'
// import BlogPP from './components/pages/settings/blogpp/BlogPP'
// import BlogTAC from './components/pages/settings/blogtac/BlogTAC'
// import ContactDev from './components/pages/settings/contact/ContactDev'
// import EditPP from './components/pages/settings/blogpp/EditPP'
// import EditTAC from './components/pages/settings/blogtac/EditTAC'
// import BlogAbout from './components/pages/settings/blogab/BlogAbout'
// import EditAbout from './components/pages/settings/blogab/EditAbout'
// import ContactAdmin from './components/pages/settings/contact/ContactAdmin'
// import AddPost from './components/pages/home/AddPost'
// import Dashboard from './components/pages/dashboard/Dashboard'

// import { ProtectedRoute } from './components/functionals/ProtectedRoute'
// import { RouteForAdmin } from './components/functionals/RouteForAdmin'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import { Provider } from 'react-redux';
// import store from './store';
// import { loadUser } from './actions/authActions';

function App() {

  // useEffect(() => {
  //   if(!['/confirmAccount', '/resetPass'].some(el => window.location.pathname.includes(el))) {
  //     store.dispatch(loadUser());
  //   }
  // }, [])

  return (
    <h1>000</h1>
    // <Provider store={store}>
    //   <h1>AAA</h1>
    //   <Router>
    //     <h1>BBB</h1>

    //     <AppNavbar/>            
    //     <RoutesNav/>

    //     <Switch>
    //       <h1>CCC</h1>
          
    //         {/* <ProtectedRoute path="/section/(page)?/:page?/(sort)?/:sort?" component={Section} /> */}

    //       <ProtectedRoute path="/dashboard" component={Dashboard} />
    //       <ProtectedRoute path="/addpost" component={AddPost} />

    //       <ProtectedRoute path="/myaccount" exact component={MyAccount} />
    //       <ProtectedRoute path="/myaccount/page/:page" exact component={MyAccount} />
    //       <ProtectedRoute path="/myaccount/sort/:sort" exact component={MyAccount} />
    //       <ProtectedRoute path="/myaccount/search/:search" exact component={MyAccount} />
    //       <ProtectedRoute path="/myaccount/page/:page/sort/:sort" exact component={MyAccount} />
    //       <ProtectedRoute path="/myaccount/search/:search/page/:page" exact component={MyAccount} />
    //       <ProtectedRoute path="/myaccount/search/:search/sort/:sort" exact component={MyAccount} />
    //       <ProtectedRoute path="/myaccount/search/:search/page/:page/sort/:sort" exact component={MyAccount} />

    //       <ProtectedRoute path="/search/:search" exact component={PostsList} />
    //       <ProtectedRoute path="/search/:search/page/:page" exact component={PostsList} />
    //       <ProtectedRoute path="/search/:search/sort/:sort" exact component={PostsList} />
    //       <ProtectedRoute path="/search/:search/page/:page/sort/:sort" exact component={PostsList} />
    //       <ProtectedRoute path="/search/:search/author/:author" exact component={PostsList} />
    //       <ProtectedRoute path="/search/:search/author/:author/sort/:sort" exact component={PostsList} />
    //       <ProtectedRoute path="/search/:search/author/:author/page/:page" exact component={PostsList} />
    //       <ProtectedRoute path="/search/:search/author/:author/page/:page/sort/:sort" exact component={PostsList} />

    //       <Route path="/confirmAccount/:token" component={ConfirmAccount} />
    //       <RouteForAdmin path="/editabout/:id" component={EditAbout} />
    //       <RouteForAdmin path="/edit/:id" component={EditPage} />
    //       <RouteForAdmin path="/edittc/:id" component={EditTAC} />
    //       <RouteForAdmin path="/editpp/:id" component={EditPP} />
    //       <ProtectedRoute path="/contact admin" component={ContactAdmin} />
    //       <RouteForAdmin path="/settings/about us" component={BlogAbout} />
    //       <RouteForAdmin path="/settings/contact developer" component={ContactDev} />
    //       <RouteForAdmin path="/settings/blog privacy policies" exact component={BlogPP} />
    //       <RouteForAdmin path="/settings/blog terms and conditions" exact component={BlogTAC} />
    //       <RouteForAdmin path="/settings" exact component={Settings} />
    //       <Route path="/termsandconditions" component={TermsConds} />
    //       <Route path="/privacypolicies" component={PrivacyPolicies} />

    //       <ProtectedRoute path="/" exact component={PostsList} />
    //       <ProtectedRoute path="/page/:page" exact component={PostsList} />
    //       <ProtectedRoute path="/sort/:sort" exact component={PostsList} />
    //       <ProtectedRoute path="/page/:page/sort/:sort" exact component={PostsList} />
    //       <ProtectedRoute path="/author/:author" exact component={PostsList} />
    //       <ProtectedRoute path="/author/:author/sort/:sort" exact component={PostsList} />
    //       <ProtectedRoute path="/author/:author/page/:page" exact component={PostsList} />
    //       <ProtectedRoute path="/author/:author/page/:page/sort/:sort" exact component={PostsList} />
          
    //       <RouteForAdmin path="/users" exact component={UsersList} />
    //       <RouteForAdmin path="/users/rl/:rl" exact component={UsersList} />
    //       <RouteForAdmin path="/users/page/:page" exact component={UsersList} />
    //       <RouteForAdmin path="/users/sort/:sort" exact component={UsersList} />
    //       <RouteForAdmin path="/users/search/:search" exact component={UsersList} />
    //       <RouteForAdmin path="/users/page/:page/sort/:sort" exact component={UsersList} />
    //       <RouteForAdmin path="/users/search/:search/page/:page" exact component={UsersList} />
    //       <RouteForAdmin path="/users/search/:search/sort/:sort" exact component={UsersList} />
    //       <RouteForAdmin path="/users/search/:search/rl/:rl" exact component={UsersList} />
    //       <RouteForAdmin path="/users/rl/:rl/page/:page" exact component={UsersList} />
    //       <RouteForAdmin path="/users/rl/:rl/sort/:sort" exact component={UsersList} />
    //       <RouteForAdmin path="/users/search/:search/page/:page/sort/:sort" exact component={UsersList} />
    //       <RouteForAdmin path="/users/search/:search/rl/:rl/sort/:sort" exact component={UsersList} />
    //       <RouteForAdmin path="/users/search/:search/rl/:rl/page/:page" exact component={UsersList} />
    //       <RouteForAdmin path="/users/rl/:rl/page/:page/sort/:sort" exact component={UsersList} />            
    //       <RouteForAdmin path="/users/search/:search/rl/:rl/page/:page/sort/:sort" exact component={UsersList} />
          
    //       <RouteForAdmin path="/subslist" exact component={SubsList} />
    //       <RouteForAdmin path="/subslist/page/:page" exact component={SubsList} />
    //       <RouteForAdmin path="/subslist/sort/:sort" exact component={SubsList} />
    //       <RouteForAdmin path="/subslist/search/:search" exact component={SubsList} />
    //       <RouteForAdmin path="/subslist/page/:page/sort/:sort" exact component={SubsList} />
    //       <RouteForAdmin path="/subslist/search/:search/page/:page" exact component={SubsList} />
    //       <RouteForAdmin path="/subslist/search/:search/sort/:sort" exact component={SubsList} />
    //       <RouteForAdmin path="/subslist/search/:search/page/:page/sort/:sort" exact component={SubsList} />

    //       <ProtectedRoute path="/changepass/:id" component={ChangePass} />
    //       <ProtectedRoute path="/editprofile/:id" component={EditProfile} />
    //       <Route path="/resetPass/:token" component={ResetPass} />
    //       <ProtectedRoute path="/post/:id" component={PostPage} />

    //     </Switch>

    //     <Footer/>

    //   </Router>
    // </Provider>
  );
}

export default App;
