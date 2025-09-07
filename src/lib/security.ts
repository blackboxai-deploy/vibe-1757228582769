// Client-side security and anti-tampering measures
export class SecurityManager {
  private static instance: SecurityManager
  private securityViolations: number = 0
  private maxViolations: number = 3
  private isBlocked: boolean = false
  private sessionId: string = ''

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeSecurityMeasures()
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager()
    }
    return SecurityManager.instance
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  private initializeSecurityMeasures(): void {
    if (typeof window === 'undefined') return

    // Detect console opening
    this.detectConsoleOpening()
    
    // Disable right-click context menu
    this.disableRightClick()
    
    // Disable common keyboard shortcuts
    this.disableKeyboardShortcuts()
    
    // Detect DevTools
    this.detectDevTools()
    
    // Prevent text selection and copying
    this.preventTextSelection()
    
    // Monitor DOM manipulation
    this.monitorDOMChanges()
    
    // Detect debugging attempts
    this.detectDebugging()

    // Start security monitoring loop
    this.startSecurityMonitoring()
  }

  private detectConsoleOpening(): void {
    const threshold = 200
    const interval = 500

    setInterval(() => {
      if (this.isBlocked) return

      const before = Date.now()
      // This will be blocked/slowed in dev tools
      debugger
      const after = Date.now()

      if (after - before > threshold) {
        this.handleSecurityViolation('Console/DevTools detected')
      }
    }, interval)

    // Alternative console detection method
    let devtools = { open: false, orientation: null }
    const threshold2 = 160

    setInterval(() => {
      if (this.isBlocked) return

      if (window.outerHeight - window.innerHeight > threshold2 || 
          window.outerWidth - window.innerWidth > threshold2) {
        if (!devtools.open) {
          devtools.open = true
          this.handleSecurityViolation('DevTools window detected')
        }
      } else {
        devtools.open = false
      }
    }, 1000)
  }

  private disableRightClick(): void {
    if (typeof window === 'undefined') return

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this.handleSecurityViolation('Right-click attempt')
      return false
    })
  }

  private disableKeyboardShortcuts(): void {
    if (typeof window === 'undefined') return

    const blockedKeys = [
      { key: 'F12' }, // DevTools
      { key: 'F11' }, // Fullscreen (can hide security measures)
      { ctrl: true, shift: true, key: 'I' }, // DevTools
      { ctrl: true, shift: true, key: 'J' }, // Console
      { ctrl: true, key: 'U' }, // View Source
      { ctrl: true, key: 'S' }, // Save Page
      { ctrl: true, shift: true, key: 'C' }, // Inspect Element
      { ctrl: true, key: 'A' }, // Select All
      { ctrl: true, key: 'C' }, // Copy
      { ctrl: true, key: 'V' }, // Paste
      { ctrl: true, key: 'X' }, // Cut
    ]

    document.addEventListener('keydown', (e) => {
      for (const blocked of blockedKeys) {
        const match = (!blocked.ctrl || e.ctrlKey) &&
                     (!blocked.shift || e.shiftKey) &&
                     (blocked.key === e.key || blocked.key === e.code)

        if (match) {
          e.preventDefault()
          e.stopPropagation()
          this.handleSecurityViolation(`Blocked shortcut: ${blocked.key}`)
          return false
        }
      }
      return true
    })
  }

  private detectDevTools(): void {
    if (typeof window === 'undefined') return

    // Monitor window resize (DevTools opening/closing)
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth

    window.addEventListener('resize', () => {
      if (this.isBlocked) return

      const heightDiff = Math.abs(window.innerHeight - windowHeight)
      const widthDiff = Math.abs(window.innerWidth - windowWidth)

      // Large sudden changes might indicate DevTools
      if (heightDiff > 100 || widthDiff > 100) {
        this.handleSecurityViolation('Suspicious window resize detected')
      }

      windowHeight = window.innerHeight
      windowWidth = window.innerWidth
    })
  }

  private preventTextSelection(): void {
    if (typeof window === 'undefined') return

    // Disable text selection
    document.onselectstart = () => false
    document.onmousedown = () => false

    // Disable drag
    document.ondragstart = () => false

    // Add CSS to prevent selection
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      input, textarea, [contenteditable] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `
    document.head.appendChild(style)
  }

  private monitorDOMChanges(): void {
    if (typeof window === 'undefined') return

    const observer = new MutationObserver((mutations) => {
      if (this.isBlocked) return

      mutations.forEach((mutation) => {
        // Detect unauthorized script injection
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'SCRIPT' || node.nodeName === 'IFRAME') {
              // Check if script was added by our application
              if (!(node as Element).hasAttribute('data-echolive-authorized')) {
                this.handleSecurityViolation('Unauthorized script/iframe injection detected')
              }
            }
          })
        }

        // Detect style modifications that might hide security measures
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement
          if (target.style.display === 'none' && target.id === 'security-overlay') {
            this.handleSecurityViolation('Security overlay manipulation attempted')
          }
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    })
  }

  private detectDebugging(): void {
    if (typeof window === 'undefined') return

    // Monitor console usage
    const originalLog = console.log
    const originalWarn = console.warn
    const originalError = console.error

    console.log = (...args) => {
      this.handleSecurityViolation('Console.log usage detected')
      return originalLog.apply(console, args)
    }

    console.warn = (...args) => {
      this.handleSecurityViolation('Console.warn usage detected')
      return originalWarn.apply(console, args)
    }

    console.error = (...args) => {
      this.handleSecurityViolation('Console.error usage detected')
      return originalError.apply(console, args)
    }
  }

  private startSecurityMonitoring(): void {
    if (typeof window === 'undefined') return

    // Check for common debugging tools
    setInterval(() => {
      if (this.isBlocked) return

      // Check for Firebug
      if ((window as any).console && (window as any).console.firebug) {
        this.handleSecurityViolation('Firebug detected')
      }

      // Check for Chrome DevTools
      if ((window as any).chrome && (window as any).chrome.runtime) {
        this.handleSecurityViolation('Chrome extension environment detected')
      }

      // Monitor window.top changes (frame busting attempts)
      if (window.top !== window.self) {
        this.handleSecurityViolation('Frame embedding detected')
      }

      // Check for common automation tools
      if ((window as any).webdriver || 
          (window as any).navigator && (window as any).navigator.webdriver) {
        this.handleSecurityViolation('Automation tool detected')
      }
    }, 2000)
  }

  private handleSecurityViolation(reason: string): void {
    this.securityViolations++
    
    // Log violation
    this.logSecurityViolation(reason)

    // Progressive enforcement
    if (this.securityViolations >= this.maxViolations && !this.isBlocked) {
      this.blockAccess(reason)
    } else if (this.securityViolations === 2) {
      this.showSecurityWarning()
    }
  }

  private logSecurityViolation(reason: string): void {
    const violation = {
      timestamp: new Date().toISOString(),
      reason: reason,
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      violationCount: this.securityViolations
    }

    // Send to server for logging
    fetch('/api/security/violation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(violation),
    }).catch(() => {
      // Fail silently to prevent errors from disrupting the flow
    })
  }

  private showSecurityWarning(): void {
    if (typeof window === 'undefined') return

    const warningDiv = document.createElement('div')
    warningDiv.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #ff3b30;
      color: white;
      padding: 15px;
      border-radius: 8px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `
    warningDiv.textContent = '⚠️ Security violation detected. Further violations will result in access termination.'
    
    document.body.appendChild(warningDiv)
    
    setTimeout(() => {
      if (warningDiv.parentNode) {
        warningDiv.parentNode.removeChild(warningDiv)
      }
    }, 5000)
  }

  private blockAccess(reason: string): void {
    this.isBlocked = true
    
    // Show security overlay
    const overlay = document.getElementById('security-overlay')
    if (overlay) {
      overlay.classList.remove('hidden')
      overlay.classList.add('flex')
    }

    // Redirect after delay
    setTimeout(() => {
      window.location.href = '/user-terminated?reason=' + encodeURIComponent(reason)
    }, 3000)

    // Disable all interactions
    document.body.style.pointerEvents = 'none'
    document.body.style.userSelect = 'none'
  }

  public checkAuthStatus(): boolean {
    // Check if user is still authenticated
    const authToken = this.getCookie('auth-token')
    const sessionId = this.getCookie('session-id')
    
    return !!(authToken && sessionId)
  }

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null
    }
    return null
  }

  public initializeForPage(): void {
    // Initialize security for current page
    if (typeof window !== 'undefined') {
      // Mark legitimate scripts
      const scripts = document.querySelectorAll('script')
      scripts.forEach(script => {
        script.setAttribute('data-echolive-authorized', 'true')
      })

      // Start session heartbeat
      this.startSessionHeartbeat()
    }
  }

  private startSessionHeartbeat(): void {
    if (typeof window === 'undefined') return

    setInterval(() => {
      if (this.isBlocked) return

      fetch('/api/auth/heartbeat', {
        method: 'POST',
        credentials: 'include'
      }).then(response => {
        if (!response.ok) {
          // Session expired, redirect to login
          window.location.href = '/login?expired=true'
        }
      }).catch(() => {
        // Network error, ignore
      })
    }, 300000) // 5 minutes
  }
}

// Initialize security manager
export const initializeSecurity = () => {
  if (typeof window !== 'undefined') {
    const security = SecurityManager.getInstance()
    security.initializeForPage()
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeSecurity()
  })
}