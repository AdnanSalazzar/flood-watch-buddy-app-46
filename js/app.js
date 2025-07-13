
// App State Management
let currentScreen = 'loading';
let appData = {
    riskLevel: 'moderate',
    lastUpdated: new Date(),
    floodZones: [
        { id: 1, area: 'Downtown Area', severity: 'high', affected: '2,500 people' },
        { id: 2, area: 'Riverside District', severity: 'moderate', affected: '1,200 people' },
        { id: 3, area: 'Hill Station', severity: 'low', affected: '300 people' }
    ],
    safeRoutes: [
        {
            id: 1,
            name: 'Main Street Route',
            distance: '2.1 km',
            time: '25 min',
            safety: 'High',
            landmarks: ['Community Center', 'High School', 'Police Station']
        },
        {
            id: 2,
            name: 'Hill Path Route',
            distance: '3.2 km',
            time: '35 min',
            safety: 'Very High',
            landmarks: ['Hill View Park', 'Water Tower', 'Fire Station']
        }
    ],
    chatMessages: [],
    settings: {
        language: 'en',
        pushNotifications: true,
        smsAlerts: true,
        emergencyContact: ''
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show loading screen
    setTimeout(() => {
        showScreen('home');
        updateLastUpdated();
        loadFloodZones();
        loadRoutes();
        initializeChatTimestamp();
        initializeSliders();
        initializeTransportModes();
        initializeSeverityButtons();
        initializeGuideTabs();
    }, 2000);
}

// Screen Navigation
function showScreen(screenName) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;
    }
}

// Update Functions
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = new Date().toLocaleTimeString();
    }
}

function loadFloodZones() {
    const zoneContainer = document.getElementById('floodZones');
    if (!zoneContainer) return;
    
    zoneContainer.innerHTML = '';
    appData.floodZones.forEach(zone => {
        const zoneElement = createZoneElement(zone);
        zoneContainer.appendChild(zoneElement);
    });
}

function createZoneElement(zone) {
    const div = document.createElement('div');
    div.className = 'zone-item';
    div.innerHTML = `
        <div style="display: flex; align-items: center;">
            <div class="zone-indicator ${zone.severity}"></div>
            <div>
                <strong>${zone.area}</strong>
                <p style="margin: 0; color: #666; font-size: 0.9rem;">${zone.affected}</p>
            </div>
        </div>
        <span class="safety-badge">${zone.severity.toUpperCase()} RISK</span>
    `;
    return div;
}

function loadRoutes() {
    const routeContainer = document.getElementById('routeList');
    if (!routeContainer) return;
    
    routeContainer.innerHTML = '';
    appData.safeRoutes.forEach(route => {
        const routeElement = createRouteElement(route);
        routeContainer.appendChild(routeElement);
    });
}

function createRouteElement(route) {
    const div = document.createElement('div');
    div.className = 'route-item';
    div.innerHTML = `
        <div class="route-header">
            <h4>${route.name}</h4>
            <span class="safety-badge">${route.safety} Safety</span>
        </div>
        <div class="route-info">
            <span><i class="fas fa-map-marker-alt"></i> ${route.distance}</span>
            <span><i class="fas fa-clock"></i> ${route.time}</span>
        </div>
        <div style="margin: 0.5rem 0; font-size: 0.9rem;">
            <strong>Landmarks:</strong> ${route.landmarks.join(', ')}
        </div>
        <button class="submit-btn" style="margin-top: 0.5rem; font-size: 0.9rem; padding: 0.5rem 1rem;" onclick="startNavigation('${route.name}')">
            Start Navigation
        </button>
    `;
    return div;
}

// Chat Functions
function initializeChatTimestamp() {
    const timestamp = document.querySelector('.timestamp');
    if (timestamp) {
        timestamp.textContent = new Date().toLocaleTimeString();
    }
}

function sendMessage(message = null) {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    const messageText = message || messageInput.value.trim();
    if (!messageText) return;
    
    // Add user message
    const userMessage = createMessageElement(messageText, false);
    chatMessages.appendChild(userMessage);
    
    // Clear input
    if (messageInput) messageInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = getBotResponse(messageText);
        const botMessage = createMessageElement(botResponse, true);
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function createMessageElement(text, isBot) {
    const div = document.createElement('div');
    div.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
    div.innerHTML = `
        <i class="fas ${isBot ? 'fa-robot' : 'fa-user'}"></i>
        <div class="message-content">
            <p>${text}</p>
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        </div>
    `;
    return div;
}

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('shelter') || msg.includes('safe place')) {
        return "The nearest shelter is the Community Center, located 0.5 km from your current location. It has capacity for 500 people and is currently accepting evacuees. Would you like directions?";
    } else if (msg.includes('rescue') || msg.includes('help') || msg.includes('emergency')) {
        return "I've alerted emergency services to your location. Please stay where you are if it's safe, or move to higher ground if possible. Keep your phone charged and stay on the line. Help is on the way!";
    } else if (msg.includes('safe') || msg.includes('danger')) {
        return "Your current area shows MODERATE flood risk. I recommend monitoring the situation closely and being prepared to evacuate if conditions worsen. Stay away from flooded roads and moving water.";
    } else if (msg.includes('pack') || msg.includes('evacuate')) {
        return "For evacuation, pack: Important documents, medications, water (1 gallon per person per day), non-perishable food, flashlight, batteries, first aid kit, and warm clothes. Keep everything in a waterproof bag.";
    } else {
        return "I understand your concern. For immediate emergencies, please call local emergency services. I'm here to provide flood safety information and help you find resources. What specific help do you need?";
    }
}

// Initialize event listeners for chat input
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'messageInput') {
        sendMessage();
    }
});

// Report Form Functions
function initializeSliders() {
    const depthSlider = document.getElementById('depthSlider');
    const depthValue = document.getElementById('depthValue');
    
    if (depthSlider && depthValue) {
        depthSlider.addEventListener('input', function() {
            depthValue.textContent = this.value + ' cm';
        });
    }
}

function initializeSeverityButtons() {
    const severityButtons = document.querySelectorAll('.severity-btn');
    severityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            severityButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function uploadPhoto() {
    // Simulate photo upload
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #4caf50; font-size: 2rem;"></i>
            <span style="color: #4caf50;">Photo uploaded successfully!</span>
        `;
    }
}

function submitReport(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Report...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Flood report submitted successfully! Thank you for helping your community stay safe.');
        showScreen('home');
        
        // Reset form
        event.target.reset();
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Submit Flood Report';
        submitBtn.disabled = false;
    }, 2000);
}

// Route Functions
function initializeTransportModes() {
    const transportButtons = document.querySelectorAll('.transport-btn');
    transportButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            transportButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function startNavigation(routeName) {
    alert(`Starting navigation for ${routeName}. In a real app, this would launch turn-by-turn directions.`);
}

// Settings Functions
function saveSettings() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        appData.settings.language = languageSelect.value;
    }
    
    alert('Settings saved successfully!');
}

// Guide Functions
function initializeGuideTabs() {
    // Tab buttons are handled by showGuideTab function
}

function showGuideTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.guide-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const targetTab = document.getElementById(`guide-${tabName}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Activate button
    event.target.classList.add('active');
}

// Emergency Functions
function emergencyCall() {
    if (confirm('This will contact emergency services. Are you sure you need immediate help?')) {
        alert('Emergency services have been contacted! Help is on the way. Stay where you are if safe, or move to higher ground.');
        
        // In a real app, this would:
        // 1. Get user's location
        // 2. Call emergency services API
        // 3. Send SMS with location to emergency contacts
        // 4. Show emergency instructions
    }
}

// Utility Functions
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Auto-update functions (simulate real-time data)
function startAutoUpdate() {
    setInterval(() => {
        updateLastUpdated();
        
        // Randomly update risk level (for demo)
        if (Math.random() < 0.1) { // 10% chance every interval
            const risks = ['low', 'moderate', 'high'];
            const newRisk = risks[Math.floor(Math.random() * risks.length)];
            updateRiskLevel(newRisk);
        }
    }, 30000); // Update every 30 seconds
}

function updateRiskLevel(newLevel) {
    appData.riskLevel = newLevel;
    const riskElement = document.getElementById('riskLevel');
    if (riskElement) {
        riskElement.className = `risk-level ${newLevel}`;
        riskElement.textContent = `${newLevel.toUpperCase()} RISK`;
        
        showNotification(`Flood risk updated to: ${newLevel.toUpperCase()}`, 
                        newLevel === 'high' ? 'error' : newLevel === 'moderate' ? 'warning' : 'success');
    }
}

// Start auto-updates when app loads
setTimeout(startAutoUpdate, 5000);

console.log('Flood Watch Buddy App Initialized');
