import { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './components/AuthForm';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';
import Post from './components/Post';
import AboutUs from './components/AboutUs';
import MostExpensive from './components/MostExpensive';

import { useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

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
  };

  const logout = ()=> {
    api.logout();
    setAuth({});
  };

  const createPost = async(post)=> {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    navigate(`/posts/${post._id}`);
  };

  const deletePost = async (post)=> {
    const filtered = posts.filter(item => item._id !== post)
    await api.deletePost(post)
    console.log(filtered)
    setPosts([...filtered])
    navigate('/')
  }


  return (
    <>
      <h1><Link to='/'>Strangers Things ({ posts.length })</Link></h1>
      {
        auth.username ? (
          <div>
            <h1>
              Welcome { auth.username }
              <button onClick={ logout }>Logout</button>
            </h1>
            <nav>
              <Link to='/posts/create'>Create A Post</Link>
              <Link to='/about_us'>About Us</Link>
              <Link to='/most_expensive'>Most Expensive Item</Link>
            </nav>
            <Routes>
              <Route path='/posts/create' element={ <CreatePost createPost={ createPost } />} />
            </Routes>
          </div>
        ): (
          <>
            <AuthForm submit={ register } txt='Register'/>
            <AuthForm submit={ login } txt='Login'/>
            <nav>
              <Link to='/about_us'>About Us</Link>
              <Link to='/most_expensive'>Most Expensive Item</Link>
            </nav>
          </>
        )
      }
      <Posts posts={ posts } auth={ auth }/>
      <Routes>
        <Route path='/posts/:id' element={ <Post posts={ posts } auth={ auth } deletePost={deletePost}/>} />
        <Route path='/about_us' element={ <AboutUs />} />
        <Route path='/' element={null}></Route>
        <Route path='/most_expensive' element={<MostExpensive/>}></Route>
      </Routes>
    </>
  )
}

export default App
