const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Assign superadmin role
exports.makeSuperAdmin = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;

  if (!uid) {
    return res.status(400).send("UID required");
  }

  await admin.auth().setCustomUserClaims(uid, {
    role: "superadmin",
  });

  res.send("✅ Super Admin Created");
});