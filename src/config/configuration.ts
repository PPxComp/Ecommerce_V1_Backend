export default () => ({
  firebase: {
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
    storageBucketName: process.env.FIREBASE_STORAGE_BUCKET_NAME,
  },

  PORT: process.env.PORT,

  mongo: {
    uri: process.env.MONGO_URI,
  },
  SECURE_COOKIE: process.env.SECURE_COOKIE,
  JWT_SECRE: process.env.JWT_SECRE,
});
