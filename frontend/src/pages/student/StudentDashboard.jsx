import React, { useState } from 'react'
import Nav from '../../components/Nav'
import Newcomplaint from './Newcomplaint'
import PreviousComplain from './PreviousComplain'
import Progress from './Progress'

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('previous')

  return (
    <>
      <style>
        {`
          .dashboard-container {
            min-height: 100vh;
            background: #f8fafc;
            padding: 0;
          }

          .dashboard-header {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 2rem 0;
            margin-bottom: 2rem;
          }

          .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .dashboard-title {
            font-size: 2rem;
            font-weight: 700;
            color: #1a202c;
            margin: 0 0 0.5rem 0;
          }

          .dashboard-subtitle {
            color: #64748b;
            font-size: 1.1rem;
            margin: 0;
          }

          .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .tab-navigation {
            display: flex;
            background: white;
            border-radius: 12px;
            padding: 0.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow-x: auto;
          }

          .tab-button {
            flex: 1;
            padding: 1rem 1.5rem;
            border: none;
            background: transparent;
            color: #64748b;
            font-weight: 500;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            min-width: fit-content;
          }

          .tab-button:hover {
            background: #f1f5f9;
            color: #475569;
          }

          .tab-button.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          }

          .content-area {
            background: white;
            border-radius: 12px;
            min-height: 500px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
          }

          .content-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 500px;
            color: #94a3b8;
            text-align: center;
            padding: 2rem;
          }

          .placeholder-icon {
            width: 80px;
            height: 80px;
            background: #f1f5f9;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 2rem;
          }

          .placeholder-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #475569;
            margin-bottom: 0.5rem;
          }

          .placeholder-description {
            font-size: 1rem;
            color: #94a3b8;
            max-width: 400px;
            line-height: 1.6;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border-left: 4px solid #667eea;
          }

          .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            color: #64748b;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .header-content,
            .main-content {
              padding: 0 1rem;
            }

            .dashboard-title {
              font-size: 1.5rem;
            }

            .dashboard-subtitle {
              font-size: 1rem;
            }

            .tab-navigation {
              margin-bottom: 1.5rem;
            }

            .tab-button {
              padding: 0.8rem 1rem;
              font-size: 0.9rem;
            }

            .content-area {
              min-height: 400px;
            }

            .content-placeholder {
              height: 400px;
              padding: 1.5rem;
            }

            .placeholder-icon {
              width: 60px;
              height: 60px;
              font-size: 1.5rem;
            }

            .placeholder-title {
              font-size: 1.2rem;
            }

            .stats-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }

            .stat-card {
              padding: 1rem;
            }
          }

          @media (max-width: 480px) {
            .dashboard-header {
              padding: 1.5rem 0;
            }

            .tab-navigation {
              padding: 0.3rem;
            }

            .tab-button {
              padding: 0.6rem 0.8rem;
              font-size: 0.8rem;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
            <Nav></Nav>
        {/* Main Content */}
        <div className="main-content">
          {/* Quick Stats */}
         

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'previous' ? 'active' : ''}`}
              onClick={() => setActiveTab('previous')}
            >
              Previous Complaints
            </button>
            <button
              className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              New Complaint
            </button>
            <button
              className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              Progress Status
            </button>
        
          </div>

          {/* Content Area */}
          <div className="content-area">
            {activeTab === 'previous' && (

                <PreviousComplain></PreviousComplain>
  

            )}

            {activeTab === 'new' && (
                <Newcomplaint></Newcomplaint>
            )}

            {activeTab === 'progress' && (

              <Progress></Progress>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDashboard