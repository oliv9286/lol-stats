const express = require("express");
const { Kayn, REGIONS } = require("kayn");

const app = express();
const port = process.env.PORT || 5000;

const kayn = Kayn("<Your API KEY>")();

app.get("/summoner/:id", async (req, res) => {
  const summoner = await kayn.Summoner.by.name(req.params.id).then(resp => {
    return resp;
  });

  const matchList = await kayn.Matchlist.by
    .accountID(summoner.accountId)
    .query({
      endIndex: 5
    });

  res.send({ summoner, matchList });
});

app.get("/matches/:id", async (req, res) => {
  const match = await kayn.Match.get(req.params.id);

  res.send({ match });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
