import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [role, setrole] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const formhandler = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      role
    };
    
    try {
      let response = await fetch('https://hostel-complaint-register.onrender.com/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      })
      let data = await response.json()
      
      if (data.message === "successfuly register") {
        setShowPopup(true)
        // Optional: Clear form after successful registration
        setname('')
        setemail('')
        setpassword('')
        setrole('')
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className='main'>
        <h1 className='text-center mt-5'>Signup</h1>
        <div className="signup-container">
          <div className="form-wrapper">
            <form onSubmit={formhandler}>
              <div className="form-container">
                <input 
                  value={name} 
                  onChange={(e) => setname(e.target.value)} 
                  type="text" 
                  placeholder='enter your name' 
                /> <br />
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
                <select value={role} onChange={(e) => setrole(e.target.value)} name="role" id="">
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                </select>
                <button type='submit'>Submit</button>
                <p style={{ marginLeft: "1rem" }} className='mt-2 ml-10'>
                  already have an account ? <Link to={'/signin'}>Signin</Link>
                  
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup Modal */}
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
            <div style={{
              fontSize: '3rem',
              color: '#4CAF50',
              marginBottom: '1rem'
            }}>
              ✓
            </div>
            <h2 style={{
              color: '#333',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              Successfully Signed Up!
            </h2>
            <p style={{
              color: '#666',
              marginBottom: '1.5rem'
            }}>
              Your account has been created successfully. You can now sign in.
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