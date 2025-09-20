# Web Analytics Demo - GA4 + GTM Tracking

A starter repository for implementing web analytics tracking with Google Analytics 4 (GA4) and Google Tag Manager (GTM). This demo includes navigation click tracking and scroll depth tracking with proper event handling and duplicate prevention.

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd web-analytics-demo
```

### 2. Run Locally
Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Or just double-click index.html
```

### 3. Add Your GTM Container

1. **Get your GTM container ID** from your Google Tag Manager account
2. **Replace the GTM placeholders** in `index.html`:
   - Find the commented GTM script in the `<head>` section
   - Replace `GTM-XXXXXXX` with your actual container ID
   - Uncomment the script tags
   - Do the same for the noscript tag in the `<body>`

Example:
```html
<!-- Replace this -->
<!-- <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script> -->

<!-- With this -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-ABC123');</script>
```

## 📊 Tracking Implementation

### Navigation Click Tracking
- **Event**: `nav_click`
- **Trigger**: When users click navigation links
- **Data**: `{ event: "nav_click", section_name: "Home/About/Blog" }`

### Scroll Depth Tracking
- **Event**: `scroll_depth`
- **Trigger**: At 25%, 50%, 75%, and 100% scroll milestones
- **Data**: `{ event: "scroll_depth", scroll_percent: 25/50/75/100 }`
- **Duplicate Prevention**: Uses an object to track fired milestones

## 🔧 Complete GTM & GA4 Setup Guide

### Step 1: Create Google Analytics 4 Property

1. **Go to Google Analytics**
   - Visit [analytics.google.com](https://analytics.google.com)
   - Click "Start measuring" or "Create Account"

2. **Set up GA4 Property**
   - Account name: `Your Company Name`
   - Property name: `Web Analytics Demo`
   - Reporting time zone: Choose your timezone
   - Currency: Choose your currency

3. **Configure Data Stream**
   - Choose "Web" platform
   - Website URL: `http://localhost:8000` (or your domain)
   - Stream name: `Web Analytics Demo Stream`

4. **Get Measurement ID**
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)
   - You'll need this for GTM configuration

### Step 2: Create Google Tag Manager Container

1. **Go to Google Tag Manager**
   - Visit [tagmanager.google.com](https://tagmanager.google.com)
   - Click "Create Account"

2. **Set up GTM Account**
   - Account name: `Your Company Name`
   - Container name: `Web Analytics Demo`
   - Target platform: `Web`

3. **Get Container ID**
   - Copy your Container ID (format: `GTM-XXXXXXX`)
   - Replace `GTM-XXXXXXX` in your `index.html` file

### Step 3: Configure GTM Container

#### 3.1 Create Data Layer Variables

1. **Go to Variables → New**
2. **Create these variables:**

   **Variable 1: Section Name**
   - Variable Type: `Data Layer Variable`
   - Data Layer Variable Name: `section_name`
   - Variable Name: `DLV - Section Name`

   **Variable 2: Scroll Percent**
   - Variable Type: `Data Layer Variable`
   - Data Layer Variable Name: `scroll_percent`
   - Variable Name: `DLV - Scroll Percent`

#### 3.2 Create Triggers

1. **Go to Triggers → New**

   **Trigger 1: Navigation Click**
   - Trigger Type: `Custom Event`
   - Event name: `nav_click`
   - Trigger Name: `Custom Event - Nav Click`

   **Trigger 2: Scroll Depth**
   - Trigger Type: `Custom Event`
   - Event name: `scroll_depth`
   - Trigger Name: `Custom Event - Scroll Depth`

#### 3.3 Create Tags

1. **Go to Tags → New**

   **Tag 1: GA4 Configuration**
   - Tag Type: `Google Analytics: GA4 Configuration`
   - Measurement ID: `G-XXXXXXXXXX` (your GA4 Measurement ID)
   - Tag Name: `GA4 - Configuration`

   **Tag 2: Navigation Click Event**
   - Tag Type: `Google Analytics: GA4 Event`
   - Configuration Tag: `{{GA4 - Configuration}}`
   - Event Name: `nav_click`
   - Event Parameters:
     - `section_name`: `{{DLV - Section Name}}`
   - Triggering: `Custom Event - Nav Click`
   - Tag Name: `GA4 - Nav Click Event`

   **Tag 3: Scroll Depth Event**
   - Tag Type: `Google Analytics: GA4 Event`
   - Configuration Tag: `{{GA4 - Configuration}}`
   - Event Name: `scroll_depth`
   - Event Parameters:
     - `scroll_percent`: `{{DLV - Scroll Percent}}`
   - Triggering: `Custom Event - Scroll Depth`
   - Tag Name: `GA4 - Scroll Depth Event`

#### 3.4 Publish Container

1. **Click "Submit"**
2. **Version Name**: `Initial Setup - Nav & Scroll Tracking`
3. **Version Description**: `Added navigation click and scroll depth tracking`
4. **Click "Publish"**

### Step 4: Test Your Setup

#### 4.1 GTM Preview Mode

1. **Enable Preview Mode**
   - In GTM, click "Preview"
   - Enter your website URL: `http://localhost:8000`
   - Click "Connect"

2. **Test Navigation Clicks**
   - Click on "Home", "About", or "Blog" links
   - In GTM Preview, look for `nav_click` events
   - Verify `section_name` parameter is correct

3. **Test Scroll Depth**
   - Scroll down the page slowly
   - Watch for `scroll_depth` events at 25%, 50%, 75%, 100%
   - Verify `scroll_percent` parameter is correct

#### 4.2 GA4 DebugView

1. **Enable Debug Mode**
   - In GA4, go to Configure → DebugView
   - Add `?gtm_debug=1` to your URL: `http://localhost:8000?gtm_debug=1`

2. **Monitor Real-time Events**
   - Navigate and scroll on your page
   - Watch events appear in DebugView
   - Verify event names and parameters

### Step 5: Verify in GA4 Reports

1. **Real-time Reports**
   - Go to GA4 → Reports → Realtime
   - Navigate and scroll on your page
   - Look for custom events in the event count

2. **Events Report**
   - Go to GA4 → Reports → Engagement → Events
   - Look for `nav_click` and `scroll_depth` events
   - Click on events to see parameters

### Step 6: Advanced Configuration (Optional)

#### 6.1 Enhanced Scroll Tracking

Add time-based scroll tracking:

```javascript
// Add to script.js
let scrollStartTime = Date.now();
let maxScrollDepth = 0;

function trackScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    
    // Track maximum scroll depth
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
    }
    
    // Track time spent scrolling
    const timeSpent = Date.now() - scrollStartTime;
    
    // Your existing milestone tracking...
}
```

#### 6.2 Custom Dimensions

In GA4, create custom dimensions:

1. **Go to GA4 → Configure → Custom Definitions**
2. **Create Custom Dimensions:**
   - `Section Name` (Event-scoped)
   - `Scroll Percent` (Event-scoped)
   - `User Type` (User-scoped)

### Step 7: Troubleshooting Common Issues

#### Issue 1: Events Not Appearing in GA4
**Solutions:**
- Check GTM Preview mode for errors
- Verify Measurement ID is correct
- Ensure GTM container is published
- Check browser console for JavaScript errors

#### Issue 2: Duplicate Events
**Solutions:**
- Verify duplicate prevention logic in script.js
- Check if GTM triggers are firing multiple times
- Use GTM Preview to see trigger firing frequency

#### Issue 3: Scroll Events Not Firing
**Solutions:**
- Check if page height is sufficient for scroll milestones
- Verify scroll calculation logic
- Test with browser DevTools console

#### Issue 4: Parameters Missing
**Solutions:**
- Verify Data Layer Variable names match exactly
- Check GTM tag parameter configuration
- Use GTM Preview to inspect dataLayer contents

### Step 8: Production Deployment

1. **Update GTM Container**
   - Replace localhost URL with production domain
   - Update GA4 data stream with production URL

2. **Test in Production**
   - Use GTM Preview mode on live site
   - Verify events in GA4 DebugView
   - Monitor GA4 reports for data

3. **Set up Goals/Conversions**
   - In GA4, go to Configure → Conversions
   - Mark important events as conversions
   - Set up conversion tracking for business goals

## 📸 Screenshots Placeholders

### GTM Preview Mode
<!-- Add screenshot of GTM Preview showing events firing -->

### GA4 DebugView
<!-- Add screenshot of GA4 DebugView showing custom events -->

### Browser Console
<!-- Add screenshot of browser console showing dataLayer events -->

## ❓ Follow-up Questions & Answers

### How did you prevent duplicate scroll depth events?

I used a JavaScript object called `trackedMilestones` to keep track of which scroll milestones have already been fired:

```javascript
const trackedMilestones = {}; // Object to prevent duplicate tracking

// Check each milestone
milestones.forEach(milestone => {
    if (scrollPercent >= milestone && !trackedMilestones[milestone]) {
        trackedMilestones[milestone] = true; // Mark as tracked
        // Fire event...
    }
});
```

This ensures each milestone (25%, 50%, 75%, 100%) only fires once per page session.

### Why track nav clicks separately from pageviews?

Navigation clicks provide valuable insights that pageviews alone cannot capture:

1. **User Intent**: Shows which sections users are most interested in
2. **Navigation Patterns**: Reveals how users move through your site
3. **Content Engagement**: Helps identify popular vs. ignored sections
4. **UX Optimization**: Identifies navigation issues or popular content areas
5. **Conversion Funnels**: Can be used to build custom conversion paths

Pageviews only tell you someone visited a page, but nav clicks tell you what they're actively seeking.

### What changes for a single-page application (SPA)?

For SPAs, several modifications would be needed:

1. **History API Integration**: Track route changes using `popstate` events
2. **Virtual Pageviews**: Push virtual pageview events to dataLayer on route changes
3. **Reset Scroll Tracking**: Clear scroll milestones when navigating to new "pages"
4. **Dynamic Content**: Re-initialize tracking for dynamically loaded content

Example SPA modifications:
```javascript
// Track route changes
window.addEventListener('popstate', function() {
    // Reset scroll tracking for new "page"
    resetScrollTracking();
    
    // Push virtual pageview
    dataLayer.push({
        event: 'virtual_pageview',
        page_path: window.location.pathname
    });
});
```

### How to debug scroll tracking in GTM/GA4?

#### 1. Browser Console
```javascript
// Check dataLayer contents
debugDataLayer();

// Reset scroll tracking for testing
resetScrollTracking();

// Monitor scroll events
window.addEventListener('scroll', () => console.log('Scroll detected'));
```

#### 2. GTM Preview Mode
- Enable GTM Preview mode
- Scroll through the page
- Watch for `scroll_depth` events in the GTM Preview panel
- Verify event parameters are correct

#### 3. GA4 DebugView
- Enable debug mode in GA4
- Use the GA4 DebugView to see real-time events
- Filter by event name to see only scroll_depth events

#### 4. Network Tab
- Open browser DevTools → Network tab
- Look for requests to `google-analytics.com` or `googletagmanager.com`
- Verify events are being sent

#### 5. Common Issues
- **Events not firing**: Check if GTM container is properly loaded
- **Duplicate events**: Verify duplicate prevention logic is working
- **Wrong percentages**: Check scroll calculation logic
- **Missing parameters**: Verify dataLayer variable configuration in GTM

## 🎯 Testing Checklist

- [ ] GTM container loads without errors
- [ ] Navigation clicks fire `nav_click` events
- [ ] Scroll depth milestones fire at correct percentages
- [ ] No duplicate scroll events on same milestone
- [ ] Events appear in GTM Preview mode
- [ ] Events appear in GA4 DebugView
- [ ] Visual scroll indicator updates correctly

## 🔧 Bonus Features

### localStorage Integration
The script includes commented code for localStorage integration to prevent duplicate scroll tracking across page reloads:

```javascript
// Uncomment these lines in script.js to enable localStorage tracking
const storageKey = 'scroll_milestones_tracked';
const storedMilestones = JSON.parse(localStorage.getItem(storageKey) || '{}');
Object.assign(trackedMilestones, storedMilestones);

// And in the tracking function:
localStorage.setItem(storageKey, JSON.stringify(trackedMilestones));
```

### Debug Functions
Two global debug functions are available in the browser console:
- `debugDataLayer()` - Shows current dataLayer contents
- `resetScrollTracking()` - Resets scroll tracking for testing

## 📁 File Structure

```
web-analytics-demo/
├── index.html          # Main HTML file with GTM placeholders
├── script.js           # Tracking implementation
└── README.md          # This documentation
```

## 🤝 Contributing

This is a starter template. Feel free to extend it with:
- Additional event tracking
- Enhanced scroll tracking (time-based, element-based)
- Form interaction tracking
- Video engagement tracking
- Custom dimensions and metrics

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
#   D a t a s l u s h  
 