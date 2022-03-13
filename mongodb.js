db.auth(process.env.MONGODB_INIT_USERNAME, process.env.MONGODB_INIT_PASSWORD);

db.getSiblingDB("communitybuilder");

db.createUser({
  user: process.env.MONGODB_INIT_USERNAME,
  pwd: process.env.MONGODB_INIT_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: "communitybuilder",
    },
  ],
});

db.createCollection("users", { capped: false });

db.users.insert([
  {
    username: "admin",
    password: "$2a$10$RDFpldeCrHJ2I0aO1SRvWu.GhuGO6hqPy3vDvBBqP204e7j.HI456",
  },
]);
