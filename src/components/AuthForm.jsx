import { useState } from 'react'

const AuthForm = (props)=> {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');

  const submit = async(ev)=> {
    ev.preventDefault();
    try {
      await props.submit({username, password});
    }
    catch(ex){
      if(ex.response){
        setError(ex.response.data);
      }
      else {
        setError(ex);
      }
    }
  };
  
  return (
    <form onSubmit={ submit }>
      {
        error ? error.error.message : null
      }
      <input name='use' placeholder='username' value={ username } onChange={ ev => setUsername(ev.target.value )}/>
      <input name='pass' placeholder='password' value={ password } onChange={ ev => setPassword(ev.target.value )}/>
      <button disabled={!username || !password}>{ props.txt }</button>

    </form>
  );
};

export default AuthForm;
