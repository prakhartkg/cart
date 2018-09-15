Postman collection url : https://www.getpostman.com/collections/071dbcffb1b361a18c29


---------------------------------------Add Item to cartAdded

http://localhost:8080/cart/addToCart/{userId}

http://localhost:8080/cart/addToCart/5b9b28e637aeaf02da0030ab
{
	"itemId" : "5b9c43c552c5a83ee124f72a",
	"itemName":"Cheese Cracker"
}
------------------------------------------------------------
curl --request POST \
  --url http://localhost:8080/cart/addToCart/5b9b28e637aeaf02da0030a9 \
  --header 'Content-Type: application/json' \
  --data '{
	"itemId" : "5b9c441a6614613f6933bc51",
	"itemName":"Cheese Cracker 10 mg"
}'




---------------------------------------Get Cart By userId

http://localhost:8080/cart/getCart/{userId}

http://localhost:8080/cart/getCart/5b9b28e637aeaf02da0030a9

curl --request GET \
  --url http://localhost:8080/cart/getCart/5b9b28e637aeaf02da0030a9


https://web.postman.co/collections/2156374-52294358-2288-48fb-90c0-7667f4761500?workspace=ab6b3744-28e4-4407-813f-d01b7cef44d4
