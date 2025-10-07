const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 3000;

const items = [];
const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
    } 
    
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Handle GET request to fetch item definition
    if (req.method === 'GET' && path.startsWith('/items/')) {
        const params = parsedUrl.query;
        const word = params.name;
        const foundWord = items.find(item => item.word === word);
        if(!foundWord) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'Item not found'}))
        }
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(foundWord))
        }
    } 
    // Handle POST request to add a new item
    else if (req.method === 'POST' && path === '/items') {
        let query = "";
        req.on('data', (chunk) => {
            query += chunk;
        });
            req.on('end', () => {
                try {
                    const params = new URLSearchParams(query);
                    const word = params.get('word');
                    if(items.find(item => item.word === word)) {
                        res.writeHead(400, {'Content-Type': 'text/plain'});
                        res.end(`Item "${word}" already exists.`);
                        return;
                    }
                    const definition = params.get('definition');
                    
                    if (word && definition) {
                        items.push({ word, definition });
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end(`Item "${word}" added successfully.`);
                    } 
                    else {
                        res.writeHead(400, {'Content-Type': 'text/plain'});
                        res.end('Word and definition parameters are required.');
                    }
                } catch (error) {
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    res.end('Invalid request.');
                }
            });
        }
    //FOR TESTING PURPOSES
    else if (req.method === 'GET' && path === '/print') {
        console.log('Current items:', items);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Items printed to console.');
    }

    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});