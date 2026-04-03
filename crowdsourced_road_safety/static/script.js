// Common utility functions
const API_BASE = '/api';

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Fetch all reports
async function fetchReports() {
    try {
        const response = await fetch(`${API_BASE}/reports`);
        if (!response.ok) throw new Error('Failed to fetch reports');
        return await response.json();
    } catch (error) {
        console.error('Error fetching reports:', error);
        return [];
    }
}

// Fetch single report
async function fetchReport(reportId) {
    try {
        const response = await fetch(`${API_BASE}/reports/${reportId}`);
        if (!response.ok) throw new Error('Failed to fetch report');
        return await response.json();
    } catch (error) {
        console.error('Error fetching report:', error);
        return null;
    }
}

// Create a new report
async function createReport(reportData) {
    try {
        const response = await fetch(`${API_BASE}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData)
        });
        if (!response.ok) throw new Error('Failed to create report');
        return await response.json();
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
}

// Vote on a report
async function voteOnReport(reportId, voteType) {
    try {
        const response = await fetch(`${API_BASE}/reports/${reportId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ vote_type: voteType })
        });
        if (!response.ok) throw new Error('Failed to vote on report');
        return await response.json();
    } catch (error) {
        console.error('Error voting on report:', error);
        throw error;
    }
}

// Update report status
async function updateReportStatus(reportId, status) {
    try {
        const response = await fetch(`${API_BASE}/reports/${reportId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status })
        });
        if (!response.ok) throw new Error('Failed to update report status');
        return await response.json();
    } catch (error) {
        console.error('Error updating report status:', error);
        throw error;
    }
}

// Get statistics
async function fetchStatistics() {
    try {
        const response = await fetch(`${API_BASE}/statistics`);
        if (!response.ok) throw new Error('Failed to fetch statistics');
        return await response.json();
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return null;
    }
}

// Get user location
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => {
                    console.warn('Geolocation error:', error);
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation not supported'));
        }
    });
}

// Validate form inputs
function validateReportForm(formData) {
    const errors = [];

    if (!formData.location || formData.location.trim() === '') {
        errors.push('Location is required');
    }

    if (!formData.latitude || isNaN(formData.latitude)) {
        errors.push('Valid latitude is required');
    }

    if (!formData.longitude || isNaN(formData.longitude)) {
        errors.push('Valid longitude is required');
    }

    if (!formData.hazard_type || formData.hazard_type === '') {
        errors.push('Hazard type is required');
    }

    if (!formData.severity || formData.severity === '') {
        errors.push('Severity level is required');
    }

    if (!formData.description || formData.description.trim() === '') {
        errors.push('Description is required');
    }

    return errors;
}

// Display error messages
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-error';
    alertDiv.textContent = message;
    alertDiv.style.display = 'block';

    const form = document.querySelector('form') || document.querySelector('.container');
    if (form) {
        form.parentElement.insertBefore(alertDiv, form);
        setTimeout(() => alertDiv.remove(), 5000);
    }
}

// Display success messages
function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.textContent = message;
    alertDiv.style.display = 'block';

    const form = document.querySelector('form') || document.querySelector('.container');
    if (form) {
        form.parentElement.insertBefore(alertDiv, form);
        setTimeout(() => alertDiv.remove(), 5000);
    }
}

// Sort reports by date (newest first)
function sortReportsByDate(reports) {
    return reports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Filter reports by severity
function filterReportsBySeverity(reports, severity) {
    if (!severity) return reports;
    return reports.filter(report => report.severity === severity);
}

// Filter reports by hazard type
function filterReportsByHazardType(reports, hazardType) {
    if (!hazardType) return reports;
    return reports.filter(report => report.hazard_type === hazardType);
}

// Get hazard type icon
function getHazardIcon(hazardType) {
    const icons = {
        'Pothole': '🕳️',
        'Accident': '🚗',
        'Debris': '⚠️',
        'Flooding': '🌊',
        'Construction': '🏗️',
        'Traffic Congestion': '🚦',
        'Broken Signal': '⚠️',
        'Other': '❓'
    };
    return icons[hazardType] || '📍';
}

// Get severity color
function getSeverityColor(severity) {
    const colors = {
        'Low': '#4BC0C0',
        'Medium': '#FFCE56',
        'High': '#FF9F40',
        'Critical': '#FF6384'
    };
    return colors[severity] || '#999';
}

// Initialize map with markers (if using a mapping library)
function initializeMap(mapElementId, reports) {
    console.log('Map initialization would go here');
    console.log('Reports to display:', reports);
    // This would integrate with Leaflet, Google Maps, or similar
}

// Export functions for use in HTML
window.API = {
    fetchReports,
    fetchReport,
    createReport,
    voteOnReport,
    updateReportStatus,
    fetchStatistics,
    getUserLocation,
    formatDate,
    getHazardIcon,
    getSeverityColor,
    showError,
    showSuccess
};
