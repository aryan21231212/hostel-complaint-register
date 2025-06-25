    import React from 'react'
    import { useState } from 'react'


    const Newcomplaint = () => {

        const [title, settitle] = useState("")
        const [description, setdescription] = useState("")
        const [category, setcategory] = useState("")
        const [image, setimage] = useState(null)
        const username = localStorage.getItem("name");
        const [showPopup, setShowPopup] = useState(false)

        const Complainthandler = async (e) => {
            e.preventDefault()

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("name", username);
            if (image) {
                formData.append("image", image);
            }

            let response = await fetch("https://hostel-complaint-register.onrender.com/complaint", {
                method: "POST",
                body: formData,
            })

            let data = await response.json()
            if(data.message === 'complaint added'){
                setShowPopup(true)
                settitle("")
                setdescription("")
                setcategory("")
                setimage(null)
            }
        }

    const closePopup = () => {
        setShowPopup(false)
    }

        return (
            <>
                <div className="complaint-container">
                    <form onSubmit={Complainthandler} className="complaint-form" encType="multipart/form-data">
                        <input
                            className="form-input"
                            placeholder='enter title'
                            type="text"
                            name='title'
                            onChange={(e) => settitle(e.target.value)}
                            value={title}
                        />
                        <textarea
                            className="form-textarea"
                            placeholder='enter description'
                            name="description"
                            onChange={(e) => setdescription(e.target.value)}
                            value={description}
                        />
                        <input
                            className="form-input"
                            type="text"
                            name='category'
                            placeholder='enter category'
                            onChange={(e) => setcategory(e.target.value)}
                            value={category}
                        />
                        <input
                            className="form-file"
                            type="file"
                            name='image'
                            accept="image/*"
                            onChange={(e) => setimage(e.target.files[0])}
                        />
                        <button type='submit' className="submit-btn">submit</button>
                    </form>
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
                Successfully Complaint Added!
                </h2>
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

    export default Newcomplaint