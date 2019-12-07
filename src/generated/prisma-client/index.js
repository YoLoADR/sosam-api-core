"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "CancelReason",
    embedded: false
  },
  {
    name: "Offer",
    embedded: false
  },
  {
    name: "CarType",
    embedded: false
  },
  {
    name: "Booking",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/yohann-loic-ravino-51f9e2/sosam-api-core/dev`
});
exports.prisma = new exports.Prisma();
