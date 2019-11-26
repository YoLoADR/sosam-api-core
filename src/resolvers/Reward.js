function postReward(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createReward({
    id: args.id,
    amount: args.amount,
    key: args.key,
    updatedAt: args.updatedAt
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

function deleteReward(parent, args, context, info) {
  return context.prisma.deleteReward({ id: args.id });
}

module.exports = {
  postReward,
  updateReward,
  deleteReward
};
