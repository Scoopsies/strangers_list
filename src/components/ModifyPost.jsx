import { useState } from 'react'
import { Link } from 'react-router-dom';


const ModifyPost = ({
  modifyPost,
  post,
  setModify
 })=> {
  const [location, setLocation] = useState(post.location)
  const [price, setPrice] = useState(post.price);
  const [description, setDescription] = useState(post.description);
  const [title, setTitle] = useState(post.title);
  const [error, setError] = useState('');
  const id = post._id

  const submit = async(ev)=> {
    ev.preventDefault();
    try {
      const post = {price, title, description, location, id };
      await modifyPost(post);
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

      <form onSubmit={ submit }>
        {
          error ? JSON.stringify(error, null, 2) : null
        }
        <input name='title' defaultValue={title} onChange={ev => setTitle(ev.target.value)} />
        <input name='description' defaultValue={post.description} onChange={ev => setDescription(ev.target.value)} />
        <input name='price' defaultValue={post.price} onChange={ev => setPrice(ev.target.value)} />
        <input name='location' defaultValue={post.location} onChange={ev => setLocation(ev.target.value)} />
        <button>Modify</button>
      </form>

  );
};

export default ModifyPost;
