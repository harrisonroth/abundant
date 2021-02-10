/* Create a WiFi access point and provide a web server on it. */
 

/**

Running test:
1. Upload to chip (via arduino ide)
2. Check for "AbundantSetup" wifi and connect to it with another device
3. On that device, go to "abundant.com"
4. Enter your wifi credentials
5. If you no longer see AbundantSetup, it is connected to your wifi (you can check through router to confirm)

Can update host ip to call backend on local wifi

**/

#include <ESP8266WebServer.h> 
#include <DNSServer.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <EEPROM.h>
#include <stdio.h>
#include <string.h>

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
int addr = 0;

void handleRoot() {
  String html ="<!DOCTYPE html> <html> <body> <h1>Welcome to abundant</h1> <head><meta content=\"2\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>";
  html +="<h2>Setup with your wifi</h2>";
  html +="<form action=\"/wifi\" method=\"post\"> <label for=\"name\">Wifi Name:</label><br> <input type=\"text\" id=\"name\" name=\"name\" value=\"\"><br> <label for=\"password\">Password:</label><br> <input type=\"password\" id=\"password\" name=\"password\" value=\"\"><br><br> <input type=\"submit\" value=\"Submit\"> </form>";
  html +="</body> </html>";
  server.send(200, "text/html", html);
}


void write_String(char add,String data) {
  int _size = data.length();
  int i;
  EEPROM.begin(_size+1);
  for(i=0;i<_size;i++)
  {
    EEPROM.write(add+i,data[i]);
  }
  EEPROM.write(add+_size,'\0');   //Add termination null character for String Data
  EEPROM.commit();
}

String read_String(char add) {
  int i;
  char data[100]; //Max 100 Bytes
  int len=0;
  unsigned char k;
  k=EEPROM.read(add);
  while(k != '\0' && len<500)   //Read until null character
  {    
    k=EEPROM.read(add+len);
    data[len]=k;
    len++;
  }
  data[len]='\0';
  return String(data);
}

void ingestWifiInfo() {
  String wifi = server.arg("name");
  String password = server.arg("password");
  Serial.print("Wifi Name: ");
  Serial.println(wifi);
  write_String(addr, wifi);
  write_String(addr + wifi.length()+1, password);
  wifi = read_String(addr);
  password = read_String(addr + wifi.length()+1);
  Serial.println(wifi + " : " + password);
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
  Serial.print("Checking if creditials exist\n");
  String wifi = read_String(addr);

  Serial.print("Wifi: "+wifi+"\n");
  if (wifi != NULL && wifi.length() != 0) {
    String password = read_String(addr + wifi.length()+1);
    Serial.print("Got " + wifi + ":" + password);
    WiFi.mode(WIFI_STA);
    WiFi.begin(wifi, password);
    int count = 0;
    while (WiFi.status() != WL_CONNECTED && count != 20) {
      delay(500);
      Serial.print(".");
      count++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
      wifiSetup = true;
    }
  }

  if (!wifiSetup) {
    Serial.print("Configuring access point...\n");
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
