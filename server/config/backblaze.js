const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: "00510afb4c8ea860000000002", // or accountId: 'accountId'
  applicationKey: "K00524+Rb40AdFTVPf8NfV+L8jsqAqw", // or masterApplicationKey
});

b2.authorize()
  .then(() => {
    console.log("Authorized backblaze b2");
  })
  .catch((error) => {
    console.log("Error authorizing b2");
  });

module.exports = b2;
