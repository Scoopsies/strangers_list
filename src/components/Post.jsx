import { useParams} from 'react-router-dom';

const Post = ({ posts, auth, deletePost })=> {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);
  if(!post){
    return null;
  }

 
  return (
    <div>
      <h1>{ post.title }</h1>
      <h2>Listing by: {post.author.username}</h2>
      <p>{post.description}</p>
      { auth._id === post.author._id ? <button onClick={() => deletePost(id)}>x</button>: ''}
    </div>
  );
};

export default Post;