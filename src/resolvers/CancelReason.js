function postCancelReason(parent, args, context, info) {
  return context.prisma.createCancelReason({
    value: args.value,
    label: args.label
  });
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

function deleteCancelReason(parent, args, context, info) {
  return context.prisma.deleteCancelReason({ id: args.id });
}

module.exports = {
  postCancelReason,
  updateCancelReason,
  deleteCancelReason
};
