import { useState } from "react"

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        console.log(data);
    }

  return (
    <div>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Signup