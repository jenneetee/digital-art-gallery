const admin = require('firebase-admin');
const serviceAccount = require('./digital-art-gallery-2941d-firebase-adminsdk-sqvz8-b73386ed65.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digital-art-gallery-2941d.firebaseio.com'
});

const db = admin.firestore();
module.exports = {db, admin};