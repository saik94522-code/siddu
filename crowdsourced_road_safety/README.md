# 🛣️ Crowdsourced Road Safety Network

A community-driven platform for reporting and tracking road hazards in real-time. Users can contribute by reporting hazards, voting on reports, and accessing live statistics about road safety in their area.

## 📋 Project Overview

The Crowdsourced Road Safety Network is a web-based application that enables communities to:
- **Report Hazards**: Share information about potholes, accidents, flooding, and other road issues
- **Vote on Reports**: Validate important hazards through community voting
- **Track Trends**: View statistics and dashboards showing road safety patterns
- **Stay Informed**: Access real-time updates on local road conditions

## 🏗️ Project Structure

```
crowdsourced_road_safety/
├── backend/
│   ├── app.py                 # Flask application & API endpoints
│   └── database.db            # SQLite database (auto-created)
├── templates/
│   ├── index.html            # Home page with recent reports
│   ├── report.html           # Report submission form
│   └── dashboard.html        # Statistics & analytics dashboard
├── static/
│   ├── style.css             # Styling for all pages
│   └── script.js             # JavaScript utilities & API calls
└── README.md                 # Project documentation
```

## 🔧 Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Charts**: Chart.js
- **Maps**: Geolocation API (browser native)

## 📦 Installation & Setup

### Prerequisites
- Python 3.7+
- pip (Python package manager)
- Modern web browser

### Step 1: Install Dependencies

```bash
pip install flask flask-cors
```

### Step 2: Run the Application

```bash
cd backend
python app.py
```

The application will start on `http://localhost:5000`

### Step 3: Access the Application

- **Home Page**: `http://localhost:5000/`
- **Report Hazard**: `http://localhost:5000/report`
- **Dashboard**: `http://localhost:5000/dashboard`

## 🌍 Features

### 1. Home Page (`/`)
- Welcome screen with feature overview
- Display of recent hazard reports
- Quick navigation to reporting page
- Community voting interface

### 2. Report Hazard (`/report`)
- Form to submit new hazard reports
- Auto-detect geolocation (with user permission)
- Fields for:
  - Location (address)
  - Coordinates (latitude/longitude)
  - Hazard type (pothole, accident, debris, etc.)
  - Severity level (Low, Medium, High, Critical)
  - Description
  - Image URL
- Real-time form validation

### 3. Dashboard (`/dashboard`)
- Real-time statistics:
  - Total reports count
  - Critical issues count
  - Week-over-week metrics
- Visual charts:
  - Hazard type distribution (doughnut chart)
  - Severity levels breakdown (bar chart)
- Filterable reports table
- Search functionality

## 📡 API Endpoints

### Reports
- `GET /api/reports` - Get all reports
- `GET /api/reports/<id>` - Get specific report
- `POST /api/reports` - Create new report
- `PUT /api/reports/<id>/status` - Update report status

### Voting
- `POST /api/reports/<id>/vote` - Vote on a report

### Statistics
- `GET /api/statistics` - Get road safety statistics

## 📝 Data Models

### Report
```json
{
  "id": 1,
  "location": "5th Ave & Main St",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "hazard_type": "Pothole",
  "description": "Large pothole on east side of road",
  "severity": "High",
  "image_url": "https://example.com/image.jpg",
  "timestamp": "2026-03-04T10:30:00",
  "status": "open"
}
```

### Vote
```json
{
  "id": 1,
  "report_id": 1,
  "vote_type": "helpful",
  "timestamp": "2026-03-04T11:00:00"
}
```

## 🎨 Styling

The application uses a modern, responsive design:
- **Color Scheme**: Professional blue and gray tones
- **Responsive Layouts**: Grid-based layouts that adapt to screen size
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Semantic HTML and clear visual hierarchy

### Severity Level Colors
- **Low**: Cyan (#4BC0C0)
- **Medium**: Yellow (#FFCE56)
- **High**: Orange (#FF9F40)
- **Critical**: Red (#FF6384)

## 🔐 Security Notes

- Currently using SQLite (suitable for development)
- No authentication implemented (add for production)
- CORS enabled for development (restrict in production)
- Consider adding:
  - User authentication
  - Rate limiting
  - Input validation
  - SQL injection prevention

## 🚀 Future Enhancements

- **User Accounts**: Register and track contributions
- **Map Integration**: Embed interactive maps (Leaflet, Google Maps)
- **Image Upload**: Allow direct image uploads instead of URLs
- **Categories**: Expand hazard types and add custom categories
- **Notifications**: Alert users about hazards near their location
- **Mobile App**: Native iOS/Android applications
- **Social Features**: Comments, user profiles, reputation system
- **Analytics**: Advanced reporting and data export

## 📊 Example Usage

### Creating a Report
```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "location": "5th Ave & Main St",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "hazard_type": "Pothole",
    "severity": "High",
    "description": "Large pothole on east side of road",
    "image_url": "https://example.com/image.jpg"
  }'
```

### Voting on a Report
```bash
curl -X POST http://localhost:5000/api/reports/1/vote \
  -H "Content-Type: application/json" \
  -d '{"vote_type": "helpful"}'
```

### Getting Statistics
```bash
curl http://localhost:5000/api/statistics
```

## 📄 License

This project is open source and available for community use.

## 👥 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions, please:
- Check the documentation
- Review existing issues on GitHub
- Create a new issue with detailed information

## 🙏 Acknowledgments

Built with Flask, SQLite, and Chart.js to create a safer community through crowdsourced information sharing.

---

**Last Updated**: March 4, 2026
**Version**: 1.0.0
