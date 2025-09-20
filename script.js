/**
 * Web Analytics Tracking Script
 * Handles navigation click tracking and scroll depth tracking for GA4 + GTM
 */

// Initialize dataLayer if it doesn't exist
window.dataLayer = window.dataLayer || [];

/**
 * Navigation Click Tracking
 * Tracks when users click on navigation links
 */
function initNavigationTracking() {
    const navLinks = document.querySelectorAll('nav a[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const sectionName = this.getAttribute('data-section');
            
            // Push navigation click event to dataLayer
            window.dataLayer.push({
                event: 'nav_click',
                section_name: sectionName
            });
            
            console.log(`Navigation click tracked: ${sectionName}`);
        });
    });
}

/**
 * Scroll Depth Tracking
 * Tracks scroll milestones at 25%, 50%, 75%, and 100%
 */
function initScrollDepthTracking() {
    const milestones = [25, 50, 75, 100];
    const trackedMilestones = {}; // Object to prevent duplicate tracking
    
    // Optional: localStorage to prevent duplicate tracking across page reloads
    // Uncomment the following lines to enable localStorage tracking
    /*
    const storageKey = 'scroll_milestones_tracked';
    const storedMilestones = JSON.parse(localStorage.getItem(storageKey) || '{}');
    Object.assign(trackedMilestones, storedMilestones);
    */
    
    function updateScrollIndicator(percent) {
        // Update visual indicator
        milestones.forEach(milestone => {
            const element = document.getElementById(`milestone-${milestone}`);
            if (element) {
                if (percent >= milestone) {
                    element.classList.add('reached');
                } else {
                    element.classList.remove('reached');
                }
            }
        });
    }
    
    function trackScrollDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
        
        // Update visual indicator
        updateScrollIndicator(scrollPercent);
        
        // Check each milestone
        milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !trackedMilestones[milestone]) {
                // Mark milestone as tracked
                trackedMilestones[milestone] = true;
                
                // Push scroll depth event to dataLayer
                window.dataLayer.push({
                    event: 'scroll_depth',
                    scroll_percent: milestone
                });
                
                console.log(`Scroll depth milestone reached: ${milestone}%`);
                
                // Optional: Save to localStorage to prevent duplicate tracking across reloads
                // Uncomment the following line to enable localStorage tracking
                // localStorage.setItem(storageKey, JSON.stringify(trackedMilestones));
            }
        });
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(trackScrollDepth, 100);
    });
    
    // Initial check in case page is already scrolled
    trackScrollDepth();
}

/**
 * Utility function to reset scroll tracking (useful for testing)
 * Call this function in browser console to reset tracking: resetScrollTracking()
 */
function resetScrollTracking() {
    // Clear localStorage if using it
    // localStorage.removeItem('scroll_milestones_tracked');
    
    // Reset visual indicators
    const milestones = [25, 50, 75, 100];
    milestones.forEach(milestone => {
        const element = document.getElementById(`milestone-${milestone}`);
        if (element) {
            element.classList.remove('reached');
        }
    });
    
    console.log('Scroll tracking reset. You can now test scroll depth tracking again.');
}

// Make resetScrollTracking available globally for testing
window.resetScrollTracking = resetScrollTracking;

/**
 * Initialize all tracking when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing web analytics tracking...');
    
    // Initialize navigation tracking
    initNavigationTracking();
    console.log('Navigation tracking initialized');
    
    // Initialize scroll depth tracking
    initScrollDepthTracking();
    console.log('Scroll depth tracking initialized');
    
    console.log('All tracking systems ready!');
    console.log('Try clicking navigation links or scrolling to test the tracking.');
});

/**
 * Debug helper: Log current dataLayer contents
 * Call this function in browser console: debugDataLayer()
 */
function debugDataLayer() {
    console.log('Current dataLayer contents:', window.dataLayer);
    return window.dataLayer;
}

// Make debugDataLayer available globally for testing
window.debugDataLayer = debugDataLayer;
