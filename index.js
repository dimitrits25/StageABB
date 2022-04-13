let input = document.getElementById("input");
let woorden = document.getElementById("woorden");
let woorden2 = document.getElementById("woorden2");

    client = new Paho.MQTT.Client('mqtt.eclipseprojects.io', Number(443), "dimitri159357824655");

    
   
   let button = document.getElementById("button").addEventListener("click", (e) => {
    e.preventDefault;
            client.onConnectionLost = onConnectionLost;
            client.onMessageArrived = onMessageArrived;
            client.connect({useSSL: true, onSuccess:onConnect});

        function onConnect() {


            


            console.log("onConnect");
            client.subscribe("IOT.Stage.Robot./159357824655");
            client.subscribe("IOT.Stage.Robot./1593578246555");
            client.subscribe("IOT.Stage.Robot./15935782465555");

            message = new Paho.MQTT.Message(input.value);
            
            message.destinationName = "IOT.Stage.Robot./159357824655";
            message.destinationName = "IOT.Stage.Robot./1593578246555";
            message.destinationName = "IOT.Stage.Robot./15935782465555";
            
            let letters = /^[A-Za-z]+$/;
            
            if (message.payloadString.match(letters) && message.payloadString.length <= 6)
            {

                client.send("IOT.Stage.Robot./159357824655", message.payloadString);
                input.value = "";

                woorden2.innerHTML += message.payloadString + "<br>";
                localStorage.setItem("alleWoorden" , woorden2.innerHTML);
                client.send("IOT.Stage.Robot./1593578246555", localStorage.getItem("alleWoorden"));
                
                if (message.destinationName = "IOT.Stage.Robot./15935782465555") {
                    message = new Paho.MQTT.Message(localStorage.getItem("testen"));
                    localStorage.setItem("testen", message.payloadString);
                    console.log("mqtt 3 = ", message.payloadString);
                }
            }
 
            else
            {
                alert('Gelieve enkel letters te gebruiken. \nGelieve niet meer dan 6 letters te gebruiken.');
                input.value = "";
                client.disconnect();
            }

            

            
        };

        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0)
	        console.log("onConnectionLost:"+responseObject.errorMessage);
        };

        function onMessageArrived(message) {

            if (message.destinationName == "IOT.Stage.Robot./15935782465555") {
                localStorage.setItem("testen", message.payloadString);

                console.log(message.payloadString);
                client.disconnect();
            }

            else {
                let laatsteWoord= message.payloadString;
                
                console.log("message: " + message.payloadString);
                alert('uw booschap "' + message.payloadString + '" is goed ontvangen')
                woorden.innerHTML = laatsteWoord;
                localStorage.setItem("laatste woord" , laatsteWoord)
                woorden2.innerHTML = "";
                woorden2.innerHTML += localStorage.getItem("alleWoorden");

                client.disconnect();

            }

            
        

                 
           

            
        };

    })

    let clearLijst = document.getElementById("clearLijst").addEventListener("click", (e) => {
        e.preventDefault;
       woorden.innerHTML = "";
       localStorage.setItem("laatste woord", "");
       localStorage.setItem("alleWoorden", "");
       woorden2.innerHTML = localStorage.getItem("alleWoorden");
    })

    woorden2.innerHTML += localStorage.getItem("alleWoorden");
    woorden.innerHTML = localStorage.getItem("laatste woord");







