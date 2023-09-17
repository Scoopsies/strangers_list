import { useParams} from 'react-router-dom';
import ModifyPost from './ModifyPost';
import { useState } from 'react';

const Post = ({ posts, auth, deletePost, modifyPost })=> {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);
  const [modify, setModify] = useState(false)
  // console.log(id)
  if(!post){
    return null;
  }
 
  return (
    <div className='post'>
      {
        !modify ? 
        <div className='postContent'>
          <h1>{ post.title }</h1>
          <div className='postInfo'>
            <h3>Price: {isNaN((post.price*1).toFixed(2)) ? post.price : `$${(post.price*1).toFixed(2)}`}</h3>
            <h3>Listing by: {post.author.username}</h3>
            <h3>Location: {post.location}</h3>
          </div>
          <p>{post.description}</p>
      </div> 
      : null
      }
      
      {!modify ? auth._id === post.author._id ? <button onClick={() => {
        setModify(true);
        }}>Make Changes or Delete</button>: null : null
      }  

      {modify ? <ModifyPost modifyPost={modifyPost} post={post} setModify={setModify} deletePost={deletePost} /> : null}
    </div>
  );
};

export default Post;