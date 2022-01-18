const express = require("express");
const app = express();
const dialogFlowFulfillment = require("dialogflow-fulfillment");

app.get("/", (req, res) => {
  res.send("operativni smo");
});

app.post("/", express.json(), (req, res) => {
  const agent = new dialogFlowFulfillment.WebhookClient({
    request: req,
    response: res,
  });
  //   function demoWebHook(agent) {
  //     agent.add("Saljemo odgovor sa Webhook servera"); //<--- bot ovo vraca kao odgovor
  //   }

  function demoWebHook2(agent) {
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
    console.log(req);
    console.log(res);
});

app.listen(333, () => console.log("Radi dbot"));
