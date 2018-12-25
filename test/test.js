// create
// curl -X POST 'http://localhost:4003' -d 'app=fizhi-handapp-api&url=/asset&method=GET&content={}&message=network error' -H 'appid: 59e6b71d5fbca4f8e605fef0' -H 'appsecret: 835da6856e5aeb0c39baa7c4dd7aede0' | python -m json.tool

// query
// curl -X GET 'http://localhost:4003?pageIndex=1&pageSize=200' -H 'appid: 59e6b71d5fbca4f8e605fef0' -H 'appsecret: 835da6856e5aeb0c39baa7c4dd7aede0' | python -m json.tool
