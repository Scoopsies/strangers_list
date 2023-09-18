import { Link } from "react-router-dom"

const NavBar = ({posts, auth, location}) => {


    const highestPrice = ()=> {
        if (posts.length > 0) {let highestprice = -Infinity;
        posts.forEach(item => {
          if (item.price*1 > highestprice) highestprice = item.price;
        })
        highestprice = posts.find(item => item.price === highestprice)
        return highestprice._id; } 
        return null;
      }

    return (
        <nav>
        { auth.username ? <Link className={ location.pathname === '/posts/create' ? 'navSelect' : ''} to='/posts/create'>Create A Post</Link> : null}
        <Link className={ location.pathname === '/about_us' ? 'navSelect' : ''} to='/about_us'>About Us</Link>
        <Link className={ location.pathname === '/contact_us' ? 'navSelect' : ''} to='/contact_us'>Contact Us</Link>
        <Link className={ location.pathname === `/posts/${highestPrice()}` ? 'navSelect' : ''} to={`/posts/${highestPrice()}`}>Highest Listing</Link>
    </nav>
    )
}

export default NavBar;