const http = require('k6/http')

export default function () {
  http.get('http://localhost:3000/add-event')
}
