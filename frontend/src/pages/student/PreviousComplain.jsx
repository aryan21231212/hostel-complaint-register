import React, { useEffect } from 'react'
import { useState } from 'react'

const PreviousComplain = () => {
  const [previousComplain, setpreviousComplain] = useState([])
  const username = localStorage.getItem("name");

  useEffect(() => {
    const previousComplaint = async () => {
      let response = await fetch('http://localhost:3000/allcomplaint', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: username })
      })
      let data = await response.json()
      setpreviousComplain(data.allcomplaints)
    }
    previousComplaint()
  }, [])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#f59e0b'
      case 'in progress':
        return '#3b82f6'
      case 'resolved':
        return '#10b981'
      case 'rejected':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

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

  return (
    <>
      <style>
        {`
          .complaints-container {
            padding: 2rem;
            background: #f8fafc;
            min-height: 100vh;
          }

          .complaints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .complaint-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            height: fit-content;
          }

          .complaint-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            border-color: #cbd5e1;
          }

          .card-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
          }

          .card-content {
            padding: 1.5rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1a202c;
            margin: 0;
            line-height: 1.4;
            word-wrap: break-word;
          }

          .card-status {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0;
          }

          .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: white;
          }

          .card-date {
            color: #64748b;
            font-size: 0.875rem;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: auto;
          }

          .date-icon {
            width: 16px;
            height: 16px;
            opacity: 0.7;
          }

          .no-complaints {
            text-align: center;
            padding: 4rem 2rem;
            color: #64748b;
          }

          .no-complaints-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
          }

          .no-complaints-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #475569;
            margin-bottom: 0.5rem;
          }

          .no-complaints-text {
            font-size: 1rem;
            line-height: 1.6;
          }

          .loading-state {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
            color: #64748b;
            font-size: 1.1rem;
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .complaints-container {
              padding: 1rem;
            }

            .complaints-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }

            .complaint-card {
              margin: 0;
            }

            .card-image {
              height: 180px;
            }

            .card-content {
              padding: 1.2rem;
              gap: 0.8rem;
            }

            .card-title {
              font-size: 1.1rem;
            }
          }

          @media (max-width: 480px) {
            .complaints-container {
              padding: 0.5rem;
            }

            .card-image {
              height: 160px;
            }

            .card-content {
              padding: 1rem;
            }

            .card-title {
              font-size: 1rem;
            }

            .no-complaints {
              padding: 2rem 1rem;
            }

            .no-complaints-icon {
              font-size: 3rem;
            }

            .no-complaints-title {
              font-size: 1.2rem;
            }
          }

          /* Animation for cards appearing */
          .complaint-card {
            animation: fadeInUp 0.5s ease forwards;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div className="complaints-container">
        {previousComplain.length === 0 ? (
          <div className="no-complaints">
            <div className="no-complaints-icon">📋</div>
            <h3 className="no-complaints-title">No Complaints Found</h3>
            <p className="no-complaints-text">
              You haven't submitted any complaints yet. When you do, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="complaints-grid">
            {previousComplain.map((ele, idx) => (
              <div key={idx} className="complaint-card">
                <img 
                    style={{objectFit:"co"}}
                  src={ele.image} 
                  alt={ele.title}
                  className="card-image"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="card-content">
                  <h2 className="card-title">{ele.title}</h2>
                  <div className="card-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(ele.status) }}
                    >
                      {ele.status || 'Pending'}
                    </span>
                  </div>
                  <p className="card-date">
                    <span className="date-icon">🕐</span>
                    {formatDate(ele.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default PreviousComplain