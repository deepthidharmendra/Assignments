const http = require('http')

const PORT = 3000

// Helper to send a response
function sendResponse(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' })
  res.end(message)
}

// Create the server
const server = http.createServer((req, res) => {
  const route = req.url

  console.log(`📥 Request received: ${route}`)

  if (route === '/hello') {
    sendResponse(res, 200, '👋 Hello! Welcome to my Node.js server!')

  } else if (route === '/goodbye') {
    sendResponse(res, 200, '👋 Goodbye! Thanks for visiting. See you soon!')

  } else if (route === '/contact') {
    sendResponse(res, 200, '📬 Contact us at: hello@myserver.com | Phone: +91 98765 43210')

  } else if (route === '/time') {
    const now = new Date()
    const timeString = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    sendResponse(res, 200, `🕒 Current IST Time: ${timeString}`)

  } else {
    sendResponse(res, 404, '❌ 404 - Page Not Found. Try /hello, /goodbye, /contact or /time')
  }
})

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`)
  console.log('📌 Available routes:')
  console.log('   → http://localhost:3000/hello')
  console.log('   → http://localhost:3000/goodbye')
  console.log('   → http://localhost:3000/contact')
  console.log('   → http://localhost:3000/time')
})