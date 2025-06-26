import { Link } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const [error, seterror] = useState("")

    const closePopup = () => {
        setShowPopup(false)
      }

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

            seterror(data.message)
            if(data.token){
                if (data.message === "success") {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem('name',data.name)
                    navigate('/studentDashboard')
                    
                   
                }else{
                    localStorage.setItem("token", data.token);
                    localStorage.setItem('name',data.name)
                    navigate('/AdminDashboard')
                }
            }
            setShowPopup(true);
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
                                <button  type='submit'>Submit</button>
                                   
                                <p style={{ marginLeft: "1rem" }} className='mt-2 ml-10'>
                                <Link  style={{color:"green"}} to={"/"}>Create a new account!</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%'
          }}>
          
            <h2 style={{
              color: '#333',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
                {error}
            </h2>
            <p style={{
              color: '#666',
              marginBottom: '1.5rem'
            }}>
            </p>
            <button 
              onClick={closePopup}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 30px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              OK
            </button>
          </div>
        </div>
      )}

        </>
    )
}

export default Signup