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

function deleteCarType(parent, args, context, info) {
  return context.prisma.deleteCarType({ id: args.id });
}

module.exports = {
  postCarType,
  updateCarType,
  deleteCarType
};
