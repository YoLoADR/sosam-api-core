const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10);
  // 2
  const user = await context.prisma.createUser({ ...args, password });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user
  };
}

// async function postCancelReason(parent, args, context, info) {
//   const userId = getUserId(context);
//   console.log("args", args);
//   console.log("context.prisma", context.prisma);
//   const cancelReason = await context.prisma.createCancelReason({
//     value: args.value,
//     label: args.label
//   });

//   return {
//     cancelReason
//   };
// }

// Au lieu de créer un nouvel Userobjet, vous utilisez maintenant l' prismainstance client pour récupérer l' Userenregistrement existant à l' aide de l' emailadresse envoyée en tant qu'argument dans la loginmutation. Si aucune Useradresse e-mail n'a été trouvée, vous retournez une erreur correspondante.

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user
  };
}

function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createUser({
    url: args.url,
    description: args.description
  });
}

function postCancelReason(parent, args, context, info) {
  const userId = getUserId(context);
  console.log("args", args);
  console.log("context.prisma", context.prisma);
  return context.prisma.createCancelReason({
    value: args.value,
    label: args.label
  });
}

module.exports = {
  signup,
  login,
  post,
  postCancelReason
};
