# API Duplicate Dashboard

A modern React dashboard for detecting and managing duplicate APIs using AI-powered analysis with embedded Looker Studio analytics.

## 🚀 Features

- **AI-Powered Duplicate Detection**: Uses backend AI services to identify similar APIs
- **Embedded Analytics**: Integrated Looker Studio dashboard for real-time insights
- **Interactive Filtering**: Filter duplicates by category, similarity score, and search terms
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Scanning**: AI Scan Now button triggers backend analysis
- **Detailed Comparison**: View similarity explanations and take actions on duplicates

## 🛠 Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Styling**: Tailwind CSS with custom components
- **Analytics**: Embedded Looker Studio

## 📁 Project Structure

```
api-duplicate-dashboard/
├── venv/                          # Python virtual environment
├── frontend/                      # React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── LookerStudio.js       # Embedded analytics
│   │   │   │   ├── DuplicatesList.js     # Main duplicates view
│   │   │   │   ├── CategoryTabs.js       # Category filtering
│   │   │   │   ├── ApiCard.js            # API pair display
│   │   │   │   └── SimilarityGroup.js    # Similarity grouping
│   │   │   ├── Layout/
│   │   │   │   ├── Header.js             # App header
│   │   │   │   └── Sidebar.js            # Navigation sidebar
│   │   │   └── UI/
│   │   │       ├── Button.js             # Reusable button
│   │   │       ├── Badge.js              # Status badges
│   │   │       └── LoadingSpinner.js     # Loading states
│   │   ├── hooks/
│   │   │   └── useApiDuplicates.js       # API state management
│   │   ├── services/
│   │   │   └── api.js                    # Backend API calls
│   │   ├── styles/
│   │   │   └── globals.css               # Global styles
│   │   ├── utils/
│   │   │   └── constants.js              # App constants
│   │   ├── App.js                        # Main app component
│   │   └── index.js                      # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+ (for backend)
- Backend API server running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd api-duplicate-dashboard
   ```

2. **Set up Python virtual environment**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install and run the React app**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Install Tailwind CSS dependencies**
   ```bash
   npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography
   ```

The app will be available at `http://localhost:3000`

### Backend Setup

Make sure your backend API server is running with the `/api-duplicates-scan` endpoint available at `http://localhost:8080`.

If your backend runs on a different port, update the `API_BASE_URL` in `src/utils/constants.js`.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory to customize settings:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_LOOKER_STUDIO_URL=your-looker-studio-embed-url
```

### Looker Studio URL

Update the Looker Studio embed URL in `src/utils/constants.js`:

```javascript
export const LOOKER_STUDIO_URL = "your-looker-studio-embed-url-here";
```

### Backend API Configuration

The app expects the following API endpoint:

- `GET /api-duplicates-scan` - Returns categorized duplicate API data

Expected response format:
```json
{
  "All Categories": [...],
  "Authentication": [...],
  "User Management": [...],
  // More categories
}
```

## 📱 Usage

### Dashboard Layout

The dashboard is split into two main sections:

1. **Top Half**: Embedded Looker Studio analytics dashboard
2. **Bottom Half**: Interactive API duplicates detection interface

### Key Features

#### AI Scan Now
- Click the "AI Scan Now" button to trigger backend duplicate detection
- Real-time loading states and error handling
- Results automatically populate the interface

#### Category Filtering
- Filter duplicates by API category (Authentication, User Management, etc.)
- "All Categories" shows results across all categories
- Category tabs show count of duplicates per category

#### Similarity Groups
- APIs grouped by similarity percentage (95%, 92%, etc.)
- Expandable/collapsible groups
- Color-coded by priority level (High, Medium, Low)

#### API Pair Cards
- Side-by-side comparison of similar APIs
- Similarity scores and explanations
- Action buttons for marking duplicates or false positives

#### Search and Filters
- Search across API names, descriptions, and categories
- Advanced filtering options
- Real-time filtering results

## 🎨 Customization

### Styling

The app uses Tailwind CSS for styling. Key customization points:

1. **Colors**: Update `tailwind.config.js` for brand colors
2. **Components**: Modify component styles in individual files
3. **Global Styles**: Update `src/styles/globals.css`

### Adding New Features

1. **New Components**: Add to appropriate directory under `src/components/`
2. **API Integration**: Extend `src/services/api.js`
3. **State Management**: Use or extend `src/hooks/useApiDuplicates.js`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🏗 Building for Production

```bash
# Create production build
npm run build

# Serve production build locally (optional)
npx serve -s build
```

The build artifacts will be stored in the `build/` directory.

## 📦 Deployment

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

### Deploy to AWS S3 + CloudFront
1. Build the app: `npm run build`
2. Upload `build/` contents to S3 bucket
3. Configure CloudFront distribution
4. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## 📝 API Documentation

### Expected Backend Endpoints

#### GET /api-duplicates-scan
Scans for API duplicates and returns categorized results.

**Response Format:**
```json
{
  "All Categories": [
    {
      "similarity_score_percentage": 95,
      "number_of_apis": 4,
      "pairs": [
        {
          "source": {
            "contract_id": "api001/contract/auth.json",
            "name": "Authentication API",
            "version": "v2.1",
            "description": "User authentication service",
            "category": "Authentication",
            "openapi_version": "3.0.0"
          },
          "destination": {
            "contract_id": "api002/contract/login.json",
            "name": "Login Service API",
            "version": "v1.8",
            "description": "User login and session management",
            "category": "Authentication",
            "openapi_version": "3.0.1"
          },
          "similarity_full_explanation_text": "Both APIs handle user authentication with similar endpoints and data models..."
        }
      ]
    }
  ],
  "Authentication": [...],
  "User Management": [...]
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure backend server is running on correct port
   - Check CORS settings on backend
   - Verify API endpoint URLs in constants.js

2. **Looker Studio Not Loading**
   - Check embed URL format
   - Verify sandbox permissions
   - Ensure domain is whitelisted in Looker Studio

3. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check for TypeScript errors if using TS
   - Verify all dependencies are installed

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check PostCSS configuration
   - Verify CSS import order

### Debug Mode

Enable debug logging by adding to your .env file:
```env
REACT_APP_DEBUG=true
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Backend API service for duplicate detection
- Looker Studio for analytics dashboard
- Tailwind CSS for styling framework
- Lucide React for icons
- React community for excellent ecosystem