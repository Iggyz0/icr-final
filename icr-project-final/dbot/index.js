const express = require("express");
const app = express();
const dialogFlowFulfillment = require("dialogflow-fulfillment");
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("operativni smo");
});

app.post("/", express.json(), (req, res) => {
  const agent = new dialogFlowFulfillment.WebhookClient({
    request: req,
    response: res,
  });


  //NOTE: problem 2 - kako da dohvatimo azurne podatke?
  function demoWebHook2(agent) {
    const postavke  = JSON.parse(fs.readFileSync('../src/assets/Data/Postavke.json'));


    //NOTE: problem 1 - kako dohvatiti to sto je korisnik uneo?
    // console.log(agent.query);
    for (const postavka of postavke) {
      console.log(postavka);
    }
    const payload = {
      richContent: [
        [
          {
            type: "info",
            subtitle: "Radim, al subtitle!",
            title: "Radim!",
            actionLink: "https://example.com",
            image: {
              src: {
                rawUrl: "http://dummyimage.com/249x100.png/cc0000/ffffff",
              },
            },
          },
        ],
      ],
    };

    agent.add(
      new dialogFlowFulfillment.Payload(agent.UNSPECIFIED, payload, {
        sendAsMessage: true,
        rawPayload: true,
      })
    ); //<--- bot ovo vraca kao odgovor
  }

  //mora da se trigeruje tacno specifican intent - tzv. "Mapiranje" intenta (1 intent se mapira na vise fraza?)
  var intentMap = new Map();
  //   intentMap.set("imeIntenta", demoWebHook); //intent "imeIntenta" se izmapira na funkciju demoWebHook
  intentMap.set("Test", demoWebHook2);

  agent.handleRequest(intentMap);
});

app.listen(333, () => console.log("Radi dbot"));
