const express = require("express");
const app = express();
const dialogFlowFulfillment = require("dialogflow-fulfillment");
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("operativni smo");
});

const default_bot_response_positive = "Here is what I've found...";
const default_bot_response_negative = "Sadly, I haven't found anything...";

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

    const what_user_sent = agent.query.toLowerCase().trim();
    for (const postavka of postavke) {
      if (
        what_user_sent.includes(postavka.ime.toLowerCase()) ||
        what_user_sent.includes(postavka.vrstaPostavke.toLowerCase())
      ) {
        richContents.push({
          type: "info",
          title: postavka.ime,
          subtitle: postavka.vrstaPostavke,
          actionLink: "/catalogue/exhibits/" + postavka.id,
          image: {
            src: {
              rawUrl: postavka.slika,
            },
          },
        });
      }
    }

    const payload = {
      richContent: [richContents],
    };

    // console.log(payload);
    if (richContents.length == 0) agent.add(default_bot_response_negative);
    else agent.add(default_bot_response_positive);

    agent.add(
      new dialogFlowFulfillment.Payload(agent.UNSPECIFIED, payload, {
        sendAsMessage: true,
        rawPayload: true,
      })
    ); //<--- bot ovo vraca kao odgovor
  }

  function cenaPostavkeWebhook(agent) {
    const postavke = JSON.parse(
      fs.readFileSync("../src/assets/Data/Postavke.json")
    );
    let richContents = [];

    const what_user_sent = agent.query.toLowerCase().trim();

    if (agent.parameters["number"] != "") {
      for (const postavka of postavke) {
        if (
          agent.parameters["number1"] != "" &&
          postavka.cena >= agent.parameters["number"] &&
          postavka.cena <= agent.parameters["number1"]
        ) {
          richContents.push({
            type: "info",
            title: postavka.ime,
            subtitle: postavka.vrstaPostavke,
            actionLink: "/catalogue/exhibits/" + postavka.id,
            image: {
              src: {
                rawUrl: postavka.slika,
              },
            },
          });
        } else if (agent.parameters["number1"] == "") {
          if (
            agent.parameters["greater"] != "" &&
            postavka.cena >= agent.parameters["number"]
          ) {
            richContents.push({
              type: "info",
              title: postavka.ime,
              subtitle: postavka.vrstaPostavke,
              actionLink: "/catalogue/exhibits/" + postavka.id,
              image: {
                src: {
                  rawUrl: postavka.slika,
                },
              },
            });
          } else if (
            agent.parameters["cheap"] != "" &&
            postavka.cena <= agent.parameters["number"]
          ) {
            richContents.push({
              type: "info",
              title: postavka.ime,
              subtitle: postavka.vrstaPostavke,
              actionLink: "/catalogue/exhibits/" + postavka.id,
              image: {
                src: {
                  rawUrl: postavka.slika,
                },
              },
            });
          }
        }
      }

      const payload = {
        richContent: [richContents],
      };

      console.log(agent.parameters);
      console.log(payload);

      if (richContents.length == 0) agent.add(default_bot_response_negative);
      else agent.add(default_bot_response_positive);
      agent.add(
        new dialogFlowFulfillment.Payload(agent.UNSPECIFIED, payload, {
          sendAsMessage: true,
          rawPayload: true,
        })
      );
    }
  }

  //mora da se trigeruje tacno specifican intent - tzv. "Mapiranje" intenta (1 intent se mapira na vise fraza?)
  var intentMap = new Map();
  //   intentMap.set("imeIntenta", demoWebHook); //intent "imeIntenta" se izmapira na funkciju demoWebHook
  intentMap.set("Pretraga_vrsta_i_imena_postavke", imePostavkeHook);
  intentMap.set("Pretraga_cena_postavke", cenaPostavkeWebhook);

  agent.handleRequest(intentMap);
});

app.listen(333, () => console.log("Radi dbot"));
