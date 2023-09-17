import { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './components/AuthForm';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';
import Post from './components/Post';
import AboutUs from './components/AboutUs';
import Welcome from './components/Welcome';
import NavBar from './components/NavBar';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import ContactUs from './components/ContactUs';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(()=> {
    const fetchPosts = async()=> {
      const posts = await api.fetchPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(()=> {
    const attemptLogin = async()=> {
      try {
        const _auth = await api.loginWithToken();
        setAuth(_auth);
      }
      catch(ex){
        console.log(ex);
      }
    };
    attemptLogin();
  }, []);

  const register = async(credentials)=> {
    const _auth = await api.register(credentials);
    setAuth(_auth);
  };

  const login = async(credentials)=> {
    const _auth = await api.login(credentials);
    setAuth(_auth);
    navigate('/')
  };

  const logout = ()=> {
    api.logout();
    setAuth({});
  };

  const createPost = async(post)=> {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    console.log(auth)
    setAuth(auth)
    navigate(`/posts/${post._id}`);
  };

  const deletePost = async (post)=> {
    const filtered = posts.filter(item => item._id !== post)
    await api.deletePost(post)
    setPosts([...filtered])
    navigate('/')
  }

  const modifyPost = async (post)=> {
    post = await api.modifyPost(post);
    const updated = posts.map(item => item._id === post._id ? post : item)
    setPosts([...updated])
  }

  return (
    <>
      <h1><Link to='/'>Strangers Things ({ posts.length })</Link></h1>
      {
        auth.username ? (
          <div>
            <Welcome auth={auth} posts={posts} logout={logout}/>

            <NavBar posts={posts} auth={auth} location={location} />

            <Routes>
              <Route path='/posts/create' element={<CreatePost createPost={createPost} navigate={navigate}/>}/>
              <Route path='/posts/about_us' element={null} />
              <Route path='/posts/:id' element={null} />
              <Route path='/' element={null} />
              <Route path='/posts/contact_us' element={null} />
            </Routes>
          </div>
        ): (
          <>
            <div className='authForms'>
              <AuthForm submit={ login} txt='Login'/>
              <div className='landingPage'>
                <h3>Welcome to Strangers Things.</h3>
                <h3>Login or Register to post.</h3>
              </div>
              <AuthForm submit={ register } txt='Register'/>
            </div>

            <NavBar posts={posts} auth={auth} location={location} />
          </>
        )
      }

      <Routes>
        <Route path='/posts/:id' element=
        { 
        <Post 
          posts={ posts } 
          auth={ auth } 
          deletePost={deletePost}
          modifyPost={modifyPost} 
        />
        }/>
        <Route path='/posts/about_us' element={ <AboutUs />} />
        <Route path='/' element={null} />
        <Route path='/posts/contact_us' element={<ContactUs />} />
      </Routes>
      <Posts posts={ posts } auth={ auth }/>
    </>
  )
}

export default App
