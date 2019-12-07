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
  return context.prisma.createUser({
    name: args.name,
    email: args.email,
    password: args.password,
    description: args.description,
    usertype: args.usertype,
    isAdmin: args.isAdmin,
    lastName: args.lastName,
    firstName: args.firstName,
    mobile: args.mobile,
    profile_image: args.profile_image,
    approved: args.approved,
    refferalBonus: args.refferalBonus,
    profession: args.profession
  });
}

function postBooking(parent, args, context, info) {
  return context.prisma.createBooking({
    carType: args.carType,
    customer_name: args.customer_name,
    vehicle_number: args.vehicle_number,
    driver_number: args.driver_number,
    passenger_number: args.passenger_number,
    kilometer_number: args.kilometer_number,
    hour_number: args.hour_number,
    day_number: args.day_number,
    pickupAddress: args.pickupAddress,
    pickupCity: args.pickupCity,
    dropAddress: args.dropAddress,
    dropCity: args.dropCity,
    driver_name: args.driver_name,
    status: args.status,
    trip_cost: args.trip_cost,
    discount: args.discount,
    payment_status: args.payment_status,
    comment: args.comment
  });
}

function updateBooking(parent, args, context, info) {
  return context.prisma.updateBooking({
    where: { id: args.id },

    data: {
      tripdate: args.tripdate,
      trip_start_time: args.trip_start_time,
      trip_end_time: args.trip_end_time,
      customer_name: args.customer_name,
      carType: args.carType,
      vehicle_number: args.vehicle_number,
      driver_number: args.driver_number,
      passenger_number: args.passenger_number,
      kilometer_number: args.kilometer_number,
      hour_number: args.hour_number,
      day_number: args.day_number,
      pickupAddress: args.pickupAddress,
      pickupCity: args.pickupCity,
      dropAddress: args.dropAddress,
      dropCity: args.dropCity,
      driver_name: args.driver_name,
      status: args.status,
      discount: args.discount,
      payment_status: args.payment_status,
      createdAt: args.createdAt,
      comment: args.comment
    }
  });
}

function deleteBooking(parent, args, context, info) {
  return context.prisma.deleteBooking({ id: args.id });
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

async function updateUser(parent, args, context, info) {
  // First check if there is a user with that email
  const user = await context.prisma.user({ email: args.email });

  if (!user) {
    throw new Error("No such user found");
  }
  const updatedUser = await context.prisma.updateUser({
    where: { id: user.id },

    data: {
      name: args.name,
      email: args.email,
      description: args.description,
      url: args.url,
      usertype: args.usertype,
      isAdmin: args.isAdmin,
      lastName: args.lastName,
      firstName: args.firstName,
      mobile: args.mobile,
      profile_image: args.profile_image,
      approved: args.approved,
      refferalBonus: args.refferalBonus,
      profession: args.profession
    }
  });
  return updatedUser;
}

function updateCancelReason(parent, args, context, info) {
  return context.prisma.updateCancelReason({
    where: { id: args.id },

    data: {
      value: args.value,
      label: args.label
    }
  });
}

function updateOffer(parent, args, context, info) {
  return context.prisma.updateOffer({
    where: { id: args.id },

    data: {
      max_promo_discount_value: args.max_promo_discount_value,
      min_order: args.min_order,
      promo_description: args.promo_description,
      promo_discount_type: args.promo_discount_type,
      promo_discount_value: args.promo_discount_value,
      promo_name: args.promo_name,
      promo_start: args.promo_start,
      promo_usage_limit: args.promo_usage_limit,
      promo_validity: args.promo_validity
    }
  });
}

function updateCarType(parent, args, context, info) {
  return context.prisma.updateCarType({
    where: { id: args.id },

    data: {
      convenience_fees: args.convenience_fees,
      image: args.image,
      name: args.name,
      rate_per_hour: args.rate_per_hour,
      rate_per_kilometer: args.rate_per_kilometer,
      updatedAt: args.updatedAt
    }
  });
}

function updateReward(parent, args, context, info) {
  return context.prisma.updateReward({
    where: { id: args.id },

    data: {
      amount: args.amount,
      key: args.key,
      updatedAt: args.updatedAt
    }
  });
}

async function deleteUser(parent, args, context, info) {
  // First check if there is a user with that email
  const user = await context.prisma.user({ email: args.email });

  if (!user) {
    throw new Error("No such user found");
  }
  const deletedUser = await context.prisma.deleteUser({ id: user.id });
  return deletedUser;
}

function deleteCancelReason(parent, args, context, info) {
  return context.prisma.deleteCancelReason({ id: args.id });
}

function deleteOffer(parent, args, context, info) {
  return context.prisma.deleteOffer({ id: args.id });
}

function deleteCarType(parent, args, context, info) {
  return context.prisma.deleteCarType({ id: args.id });
}

function deleteReward(parent, args, context, info) {
  return context.prisma.deleteReward({ id: args.id });
}

module.exports = {
  signup,
  login,
  postUser,
  postBooking,
  updateBooking,
  deleteBooking,
  postCancelReason,
  postOffer,
  postCarType,
  postReward,
  updateUser,
  updateCancelReason,
  updateOffer,
  updateCarType,
  updateReward,
  deleteUser,
  deleteCancelReason,
  deleteOffer,
  deleteCarType,
  deleteReward
};
