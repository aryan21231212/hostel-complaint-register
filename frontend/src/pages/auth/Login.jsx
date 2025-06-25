import { Link } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    const formhandler = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            password,
        };

        try {
            let response = await fetch('https://hostel-complaint-register.onrender.com/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            })
            let data = await response.json()

            if (data.message === "success") {
                localStorage.setItem("token", data.token);
                localStorage.setItem('name',data.name)
                navigate('/studentDashboard')
                
               
            }else{
                localStorage.setItem("token", data.token);
                localStorage.setItem('name',data.name)
                navigate('/AdminDashboard')
            }
        } catch (error) {
            console.error('Error during registration:', error)
        }
    }


    return (
        <>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className='main'>
                <h1 className='text-center mt-5'>Signin</h1>
                <div className="signup-container">
                    <div className="form-wrapper">
                        <form onSubmit={formhandler}>
                            <div className="form-container">
                                <input
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    type="email"
                                    placeholder='enter your email'
                                /> <br />
                                <input
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    type="password"
                                    placeholder='enter your password'
                                /> <br />
                                <button type='submit'>Submit</button>
                                   
                                <p style={{ marginLeft: "1rem" }} className='mt-2 ml-10'>
                                <Link  style={{color:"green"}} to={"/"}>Create a new account!</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup