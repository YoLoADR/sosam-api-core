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

function deleteOffer(parent, args, context, info) {
  return context.prisma.deleteOffer({ id: args.id });
}

module.exports = {
  postOffer,
  updateOffer,
  deleteOffer
};
