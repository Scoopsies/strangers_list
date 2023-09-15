import { useParams} from 'react-router-dom';
import ModifyPost from './ModifyPost';
import { useState } from 'react';

const Post = ({ posts, auth, deletePost, modifyPost })=> {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);
  const [modify, setModify] = useState(false)
  if(!post){
    return null;
  }
 
  return (
    <div>
      <h1>{ post.title }</h1>
      <h3>Price: {isNaN((post.price*1).toFixed(2)) ? post.price 
              : `$${(post.price*1).toFixed(2)}`}</h3>
      <h3>Listing by: {post.author.username}</h3>
      <h3>Location: {post.location}</h3>
      
      <p>{post.description}</p>
      
      {!modify ? auth._id === post.author._id ? <button onClick={() => {
          setModify(true);
          }}>Make Changes or Delete</button>: null : null
      }  

      {modify ? <ModifyPost modifyPost={modifyPost} post={post}/> : null}
      { modify ? <button onClick={() => deletePost(id)}>Delete Post</button>: ''}
      {modify ? <button onClick={() => setModify(false)}>Cancel</button> : null}
    </div>
  );
};

export default Post;