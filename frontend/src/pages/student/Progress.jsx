import React, { useEffect, useState } from 'react'

const Progress = () => {
  const [complain, setComplain] = useState([])
  const [pending, setPending] = useState(true)
  const [inProgress, setInProgress] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const username = localStorage.getItem("name");

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true)
        // API call to fetch complaints
        let response = await fetch('http://localhost:3000/allcomplaint',{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ name: username })
        })
        let data = await response.json()
        console.log(data)
        if(data.message === "success"){
          setComplain(data.allcomplaints)
        }
        setLoading(false)
        
      } catch (error) {
        setError('Failed to fetch complaints',error)
        setLoading(false)
      }
    }
    
    fetchComplaints()
  }, [])

  // Filter complaints based on status
  const pendingComplaints = (complain || []).filter(c => c.status === 'Pending');
  const inProgressComplaints = (complain || []).filter(c => c.status === 'In Progress');
  const resolvedComplaints = (complain || []).filter(c => c.status === 'Resolved');
  

  const handleStatusToggle = (status) => {
    setPending(status === 'pending')
    setInProgress(status === 'inprogress')
    setResolved(status === 'resolved')
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ef4444'
      case 'Medium': return '#f59e0b'
      case 'Low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#ef4444'
      case 'In Progress': return '#f59e0b'
      case 'Resolved': return '#10b981'
      default: return '#6b7280'
    }
  }

  const renderComplaintCard = (complaint) => (
    <div key={complaint.id} className="complaint-card">
      <div className="complaint-header">
        <h3 className="complaint-title">{complaint.title}</h3>
        <div className="status-badges">
          <span 
            className="status-badge" 
            style={{ backgroundColor: getStatusColor(complaint.status) }}
          >
            {complaint.status}
          </span>
          <span 
            className="priority-badge" 
            style={{ backgroundColor: getPriorityColor(complaint.priority) }}
          >
            {complaint.priority}
          </span>
        </div>
      </div>
      <p className="complaint-description">{complaint.description}</p>
      <div className="complaint-footer">
        <span className="complaint-date">Submitted:{formatDate(complaint.createdAt)}</span>
        
      </div>
    </div>
  )

  const getCurrentComplaints = () => {
    if (pending) return pendingComplaints
    if (inProgress) return inProgressComplaints
    if (resolved) return resolvedComplaints
    return []
  }

  const getCurrentStatus = () => {
    if (pending) return 'Pending'
    if (inProgress) return 'In Progress'
    if (resolved) return 'Resolved'
    return ''
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading complaints...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          color: #1f2937;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .status-button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          background: white;
          color: #374151;
          border: 2px solid #e5e7eb;
        }

        .status-button:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .status-button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .complaints-section {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border: 1px solid #e5e7eb;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e5e7eb;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #374151;
          margin: 0;
        }

        .count-badge {
          background: #667eea;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .complaints-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }

        .complaint-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border-left: 4px solid #667eea;
        }

        .complaint-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .complaint-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
          gap: 10px;
        }

        .complaint-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          flex: 1;
        }

        .status-badges {
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: flex-end;
        }

        .status-badge, .priority-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-align: center;
          min-width: 70px;
        }

        .complaint-description {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .complaint-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #9ca3af;
        }

        .complaint-date, .complaint-id {
          font-weight: 500;
        }

        .no-complaints {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        .no-complaints h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #374151;
        }

        .loading, .error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          color: #374151;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error {
          background: rgba(239, 68, 68, 0.9);
          border-radius: 10px;
          padding: 20px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .header h1 {
            font-size: 2rem;
          }
          
          .button-container {
            gap: 10px;
          }
          
          .status-button {
            padding: 10px 18px;
            font-size: 0.9rem;
          }
          
          .complaints-grid {
            grid-template-columns: 1fr;
          }
          
          .complaint-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .status-badges {
            flex-direction: row;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>Hostel Complaint Tracker</h1>
          <p>Monitor and track the progress of all hostel complaints</p>
        </div>

        <div className="button-container">
          <button 
            className={`status-button ${pending ? 'active' : ''}`}
            onClick={() => handleStatusToggle('pending')}
          >
            Pending ({pendingComplaints.length})
          </button>
          <button 
            className={`status-button ${inProgress ? 'active' : ''}`}
            onClick={() => handleStatusToggle('inprogress')}
          >
            In Progress ({inProgressComplaints.length})
          </button>
          <button 
            className={`status-button ${resolved ? 'active' : ''}`}
            onClick={() => handleStatusToggle('resolved')}
          >
            Resolved ({resolvedComplaints.length})
          </button>
        </div>

        <div className="complaints-section">
          <div className="section-header">
            <h2 className="section-title">{getCurrentStatus()} Complaints</h2>
            <span className="count-badge">{getCurrentComplaints().length} items</span>
          </div>

          {getCurrentComplaints().length > 0 ? (
            <div className="complaints-grid">
              {getCurrentComplaints().map(renderComplaintCard)}
            </div>
          ) : (
            <div className="no-complaints">
              <h3>No {getCurrentStatus().toLowerCase()} complaints</h3>
              <p>There are currently no complaints with this status.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Progress