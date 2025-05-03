from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Set the directory containing your HTML files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create an HTTP server with the default handler
handler = SimpleHTTPRequestHandler
# Specify port 8000
port = 8000
server_address = ('', port)

# Create and start the server
httpd = HTTPServer(server_address, handler)
print(f"Server running on port {port}...")
print(f"Open http://localhost:{port}/templetes/app.html in your browser")
httpd.serve_forever() 