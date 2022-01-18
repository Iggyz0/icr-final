const express = require("express");
const app = express();
const dialogFlowFulfillment = require("dialogflow-fulfillment");
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("operativni smo");
});

const default_bot_response = "Here is what I've found...";

app.post("/", express.json(), (req, res) => {
  const agent = new dialogFlowFulfillment.WebhookClient({
    request: req,
    response: res,
  });

  function imePostavkeHook(agent) {
    //setup
    const postavke = JSON.parse(
      fs.readFileSync("../src/assets/Data/Postavke.json")
    );
    let richContents = [];

    // console.log(postavke);
    // console.log(agent.query);
    const what_user_sent = agent.query.toLowerCase().trim();
    for (const postavka of postavke) {
      if ( what_user_sent.includes(postavka.ime.toLowerCase()) || what_user_sent.includes(postavka.vrstaPostavke.toLowerCase()) ) {
        richContents.push({
          type: "info",
          title: postavka.ime,
          subtitle: postavka.vrstaPostavke,
          actionLink: "/catalogue/exhibits/" + postavka.id,
          image: {
            src: {
              rawUrl: postavka.slika
            }
          }
        });
      }
    }

    const payload = {
      richContent: [richContents]
    };

    // console.log(payload);
    agent.add(default_bot_response)	
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
  intentMap.set("Pretraga_vrsta_i_imena_postavke", imePostavkeHook);

  agent.handleRequest(intentMap);
});

app.listen(333, () => console.log("Radi dbot"));
