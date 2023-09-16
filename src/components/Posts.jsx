import { Link } from 'react-router-dom';

const Posts = ({ posts, auth })=> {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className='listings'>
      {
        posts.map( post => {
          return (
            <div className={`listing ${ post.author._id === auth._id ? 'mine': ''}`} key={ post._id }>
                <Link onClick={() => scrollToTop()} to={`/posts/${post._id}`}>{ post.title }</Link>
                <p>by: {post.author.username}</p>
                <p>{ isNaN((post.price*1).toFixed(2)) ? post.price : `$${(post.price*1).toFixed(2)}` } </p>
            </div>
          );
        })
      }
    </div>
  );
};

export default Posts;

