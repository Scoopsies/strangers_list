import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const CreatePost = ({ createPost, navigate })=> {
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  const submit = async(ev)=> {
    ev.preventDefault();
    try {
      const post = {price, title, description, location };
      await createPost(post);
    }
    catch(ex){
      if(ex.response){
        setError(ex.response.data);
      }
      else {
        setError(ex.response);
      }
    }
  };
  return (
    <div className='create'>
      <form className='createForm' onSubmit={ submit }>
        {
          error ? JSON.stringify(error, null, 2) : null
        }
        <input name='title' placeholder='title' onChange={ev => setTitle(ev.target.value)} />
        <input name='description' placeholder='description' onChange={ev => setDescription(ev.target.value)} />
        <input name='price' placeholder='price' onChange={ev => setPrice(ev.target.value)} />
        <input name='location' placeholder='location' onChange={ev => setLocation(ev.target.value)} />
        <button>Submit Post</button>
        <button onClick={() => routeChange()}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePost;
