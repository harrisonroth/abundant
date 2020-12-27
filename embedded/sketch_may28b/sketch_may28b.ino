/* Create a WiFi access point and provide a web server on it. */
 
#include <ESP8266WebServer.h> 
#include <DNSServer.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>

/* Set these to your desired credentials. */
const char *ssid = "AbundantSetup";
const char *password = "";
ESP8266WebServer server(80);
DNSServer dnsServer;
const byte DNS_PORT = 53;
IPAddress apIP(192, 168, 1, 1);
boolean wifiSetup = true;
const char* host = "http://192.168.1.141:3000/auth/checkAuth";
const int httpsPort = 443;


/* Just a little test message.  Go to http://192.168.4.1 in a web browser
 * connected to this access point to see it.
 */
void handleRoot() {
  String html ="<!DOCTYPE html> <html> <body> <h1>Welcome to abundant</h1> <head><meta content=\"2\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>";
  html +="<h2>Setup with your wifi</h2>";
  html +="<form action=\"/wifi\" method=\"post\"> <label for=\"name\">Wifi Name:</label><br> <input type=\"text\" id=\"name\" name=\"name\" value=\"\"><br> <label for=\"password\">Password:</label><br> <input type=\"password\" id=\"password\" name=\"password\" value=\"\"><br><br> <input type=\"submit\" value=\"Submit\"> </form>";
  html +="</body> </html>";
  server.send(200, "text/html", html);
}

void ingestWifiInfo() {
  String wifi = "oof";//server.arg("name");
  String password = "ouchowiemybones";//server.arg("password");
  Serial.print("Wifi Name: ");
  Serial.println(wifi);

  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi, password);
  int count = 0;
  while (WiFi.status() != WL_CONNECTED && count != 20) {
    delay(500);
    Serial.print(".");
    count++;
  }
  
  if (WiFi.status() != WL_CONNECTED) {
    String s = "<a href='/'> <h1>Couldn't Find Wifi Go Back</h1> </a>";
    server.send(200, "text/html", s);  
  } else {
    String s = "<h1>Successfully Setup</h1>";
    server.send(200, "text/html", s);
    wifiSetup = true;
  }
  
}

void setup() {
  wifiSetup = false;
  delay(1000);
  Serial.begin(9600);
  Serial.println();
  Serial.print("Configuring access point...");
  /* You can remove the password parameter if you want the AP to be open. */
  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));

  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
  server.on("/", handleRoot);
  server.on("/wifi", ingestWifiInfo);
  Serial.println("HTTP server started");
    // modify TTL associated  with the domain name (in seconds)
  // default is 60 seconds
  dnsServer.setTTL(30000);
  // set which return code will be used for all other domains (e.g. sending
  // ServerFailure instead of NonExistentDomain will reduce number of queries
  // sent by clients)
  // default is DNSReplyCode::NonExistentDomain
  dnsServer.setErrorReplyCode(DNSReplyCode::ServerFailure);

  // start DNS server for a specific domain name
  dnsServer.start(DNS_PORT, "abundant.com", apIP);

  // simple HTTP server to see that DNS server is working
  server.onNotFound([]() {
    String message = "Hello World!\n\n";
    message += "URI: ";
    message += server.uri();

    server.send(200, "text/plain", message);
  });
  server.begin();
}

void loop() {
  if (wifiSetup == false) {
    dnsServer.processNextRequest();
    server.handleClient();
  } else {

    HTTPClient http;  //Declare an object of class HTTPClient
 
    http.begin(host);  //Specify request destination
    int httpCode = http.GET();                                                                  //Send the request
     
    if (httpCode > 0) { //Check the returning code
     
    String payload = http.getString();   //Get the request response payload
    Serial.println(payload);                     //Print the response payload
     
    }
     
    http.end();   //Close connection
    delay(10000);
  }
  
}
