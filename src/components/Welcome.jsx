const Welcome = ({auth, logout, posts}) => {

    const activePosts = posts.filter(post => post.author._id === auth._id).length
  return (
    <div className="welcome">
        <h1>
            Welcome { auth.username }!
        </h1>
        <h2>
        {
         activePosts === 0 ? 'You have no active listings.'
         : activePosts === 1 ? 'You have 1 active listing.'
         : `You have ${activePosts} listings.`   
        }
        </h2>
        <button onClick={ logout }>Logout</button>
    </div>
  )
}

export default Welcome;