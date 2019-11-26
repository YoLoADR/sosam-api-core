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

function postUser(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createUser({
    url: args.url,
    description: args.description
  });
}

function postCancelReason(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createCancelReason({
    value: args.value,
    label: args.label
  });
}

function postOffer(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createOffer({
    max_promo_discount_value: args.max_promo_discount_value,
    min_order: args.min_order,
    promo_description: args.promo_description,
    promo_discount_type: args.promo_discount_type,
    promo_discount_value: args.promo_discount_value,
    promo_name: args.promo_name,
    promo_start: args.promo_start,
    promo_usage_limit: args.promo_usage_limit,
    promo_validity: args.promo_validity
  });
}

function postCarType(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createCarType({
    convenience_fees: args.convenience_fees,
    image: args.image,
    name: args.name,
    rate_per_hour: args.rate_per_hour,
    rate_per_kilometer: args.rate_per_kilometer,
    updatedAt: args.updatedAt
  });
}

function postReward(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createReward({
    id: args.id,
    amount: args.amount,
    key: args.key,
    updatedAt: args.updatedAt
  });
}

module.exports = {
  signup,
  login,
  postUser,
  postCancelReason,
  postOffer,
  postCarType,
  postReward
};
