import React, { useEffect, useState } from 'react';
import { Search, Eye, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [complaints, setcomplaints] = useState([]);
    const [pendingCount, setpendingCount] = useState(0);
    const [progressCount, setprogressCount] = useState(0);
    const [resolvedCount, setresolvedCount] = useState(0);
    const adminName = localStorage.getItem('name');
    const [updateStatus, setupdateStatus] = useState('');

    // NEW STATES for filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const statushandler = async (e) => {
        e.preventDefault();
        let response = await fetch('http://localhost:3000/updateStatus', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: updateStatus, title: selectedComplaint.title })
        });

        let data = await response.json();
        if (data.message === "success") {
            setSelectedComplaint(null);
            window.location.reload(); // refresh after update
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        const allcomplains = async () => {
            let response = await fetch('http://localhost:3000/allComplains');
            let data = await response.json();

            const updatedComplaints = data.data.map((ele) => {
                if (ele.status === "Pending") {
                    return { ...ele, priority: "High" };
                } else if (ele.status === "In Progress") {
                    return { ...ele, priority: "Medium" };
                } else if (ele.status === "Resolved") {
                    return { ...ele, priority: "Low" };
                }
                return ele;
            });

            setcomplaints(updatedComplaints);

            data.data.forEach(ele => {
                if (ele.status === "Pending") {
                    setpendingCount(pre => pre + 1);
                }
                if (ele.status === "In Progress") {
                    setprogressCount(pre => pre + 1);
                }
                if (ele.status === "Resolved") {
                    setresolvedCount(pre => pre + 1);
                }
            });
        };
        allcomplains();
    }, []);

    // FILTERING logic here
    const filteredComplaints = complaints.filter((complaint) => {
        const matchesName = complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || complaint.status === statusFilter;
        return matchesName && matchesStatus;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'Resolved': return 'status-resolved';
            case 'In Progress': return 'status-progress';
            case 'Pending': return 'status-pending';
            default: return 'status-default';
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'priority-high';
            case 'Medium': return 'priority-medium';
            case 'Low': return 'priority-low';
            default: return 'priority-default';
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="header-container">
                    <div className="header-title">
                        <h1>Hostel Complaint Register</h1>
                        <p>Admin Dashboard</p>
                    </div>
                    <div className="header-user">
                        <h3>Welcome, <span style={{ color: "gold" }}>{adminName}</span></h3>
                        <Users size={20} />
                    </div>
                    <div className="nav-right">
                        <Link to={'/signin'} className="logout-btn">Logout</Link>
                    </div>
                </div>
            </div>

            <div className="main-container">
                <div className="stats-grid">
                    <div className="stat-card stat-resolved">
                        <div className="stat-info"><h3>Resolved</h3><div className="stat-number">{resolvedCount}</div></div>
                        <div className="stat-icon"><CheckCircle size={24} /></div>
                    </div>
                    <div className="stat-card stat-progress">
                        <div className="stat-info"><h3>In Progress</h3><div className="stat-number">{progressCount}</div></div>
                        <div className="stat-icon"><Clock size={24} /></div>
                    </div>
                    <div className="stat-card stat-pending">
                        <div className="stat-info"><h3>Pending</h3><div className="stat-number">{pendingCount}</div></div>
                        <div className="stat-icon"><AlertCircle size={24} /></div>
                    </div>
                </div>

                <div className="filters-section">
                    <div className="filters-container">
                        <div className="search-container">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by student name..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                        </select>
                    </div>
                </div>

                <div className="table-section">
                    <div className="table-header">
                        <h2>Recent Complaints</h2>
                    </div>

                    <div className="table-container">
                        <table className="complaints-table">
                            <thead className="table-head">
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Student</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComplaints.map((complaint, id) => (
                                    <tr key={complaint.id} className="table-row">
                                        <td>{id}</td>
                                        <td>{complaint.title}</td>
                                        <td>{complaint.studentName}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(complaint.status)}`}>
                                                {complaint.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`priority-badge ${getPriorityClass(complaint.priority)}`}>
                                                {complaint.priority}
                                            </span>
                                        </td>
                                        <td>{formatDate(complaint.createdAt)}</td>
                                        <td>
                                            <button onClick={() => setSelectedComplaint(complaint)} className="view-button">
                                                <Eye size={12} /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedComplaint && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Complaint Details</h3>
                            <button onClick={() => setSelectedComplaint(null)} className="modal-close">×</button>
                        </div>

                        <div className="modal-body">
                            <p><strong>Date:</strong> {formatDate(selectedComplaint.createdAt)}</p>
                            <p><strong>Title:</strong> {selectedComplaint.title}</p>
                            <p><strong>Student:</strong> {selectedComplaint.studentName}</p>
                            <p><strong>Status:</strong> {selectedComplaint.status}</p>
                            <p><strong>Priority:</strong> {selectedComplaint.priority}</p>
                            <p><strong>Description:</strong> {selectedComplaint.description}</p>
                            <img src={selectedComplaint.image} alt="Complaint" style={{ maxWidth: '100%' }} />
                        </div>

                        <form onSubmit={statushandler}>
                            <div className="modal-footer">
                                <select
                                    onChange={(e) => setupdateStatus(e.target.value)}
                                    value={updateStatus}
                                    className="status-update-select"
                                >
                                    <option>Update Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                                <div className="modal-actions">
                                    <button type="button" onClick={() => setSelectedComplaint(null)} className="modal-button secondary">
                                        Close
                                    </button>
                                    <button type="submit" className="modal-button primary">
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
