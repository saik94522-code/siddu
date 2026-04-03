from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime
import os

app = Flask(__name__, template_folder='../templates', static_folder='../static')
CORS(app)

DATABASE = 'database.db'

def init_db():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS reports
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  village TEXT,
                  location TEXT NOT NULL,
                  latitude REAL,
                  longitude REAL,
                  hazard_type TEXT,
                  description TEXT,
                  severity TEXT,
                  image_url TEXT,
                  timestamp TEXT,
                  status TEXT DEFAULT 'open')''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS votes
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  report_id INTEGER,
                  vote_type TEXT,
                  timestamp TEXT,
                  FOREIGN KEY(report_id) REFERENCES reports(id))''')
    
    conn.commit()
    conn.close()

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """Dashboard page"""
    return render_template('dashboard.html')

@app.route('/report')
def report():
    """Report page"""
    return render_template('report.html')

@app.route('/api/reports', methods=['GET'])
def get_reports():
    """Get all reports"""
    conn = get_db()
    c = conn.cursor()
    c.execute('SELECT * FROM reports ORDER BY timestamp DESC')
    reports = [dict(row) for row in c.fetchall()]
    conn.close()
    return jsonify(reports)

@app.route('/api/reports/<int:report_id>', methods=['GET'])
def get_report(report_id):
    """Get specific report"""
    conn = get_db()
    c = conn.cursor()
    c.execute('SELECT * FROM reports WHERE id = ?', (report_id,))
    report = dict(c.fetchone() or {})
    
    c.execute('SELECT * FROM votes WHERE report_id = ?', (report_id,))
    votes = [dict(row) for row in c.fetchall()]
    report['votes'] = votes
    
    conn.close()
    return jsonify(report)

@app.route('/api/reports', methods=['POST'])
def create_report():
    """Create a new report"""
    data = request.json
    
    conn = get_db()
    c = conn.cursor()
    
    c.execute('''INSERT INTO reports 
                 (village, location, latitude, longitude, hazard_type, description, severity, image_url, timestamp)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
              (data.get('village'),
               data.get('location'),
               data.get('latitude'),
               data.get('longitude'),
               data.get('hazard_type'),
               data.get('description'),
               data.get('severity'),
               data.get('image_url'),
               datetime.now().isoformat()))
    
    report_id = c.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({'id': report_id, 'message': 'Report created successfully'}), 201

@app.route('/api/reports/<int:report_id>/vote', methods=['POST'])
def vote_report(report_id):
    """Vote on a report"""
    data = request.json
    vote_type = data.get('vote_type')  # 'helpful' or 'not_helpful'
    
    conn = get_db()
    c = conn.cursor()
    
    c.execute('''INSERT INTO votes (report_id, vote_type, timestamp)
                 VALUES (?, ?, ?)''',
              (report_id, vote_type, datetime.now().isoformat()))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Vote recorded'}), 201

@app.route('/api/reports/<int:report_id>/status', methods=['PUT'])
def update_report_status(report_id):
    """Update report status"""
    data = request.json
    status = data.get('status')
    
    conn = get_db()
    c = conn.cursor()
    c.execute('UPDATE reports SET status = ? WHERE id = ?', (status, report_id))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Status updated'}), 200

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    """Get road safety statistics"""
    conn = get_db()
    c = conn.cursor()
    
    c.execute('SELECT COUNT(*) as total FROM reports')
    total_reports = dict(c.fetchone())['total']
    
    c.execute('SELECT hazard_type, COUNT(*) as count FROM reports GROUP BY hazard_type')
    hazard_types = {row[0]: row[1] for row in c.fetchall()}
    
    c.execute('SELECT severity, COUNT(*) as count FROM reports GROUP BY severity')
    severity_counts = {row[0]: row[1] for row in c.fetchall()}
    
    conn.close()
    
    return jsonify({
        'total_reports': total_reports,
        'hazard_types': hazard_types,
        'severity_counts': severity_counts
    })

if __name__ == '__main__':
    if not os.path.exists(DATABASE):
        init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
