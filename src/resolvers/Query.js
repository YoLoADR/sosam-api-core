async function getUsers(parent, args, context, info) {
  // Si "argument de filtre" on construit un ~ WHERE en SQL
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {};
  const users = await context.prisma.users({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });
  const count = await context.prisma
    .usersConnection({
      where
    })
    .aggregate()
    .count();
  return {
    users,
    count
  };
}

function getCancelReason(parent, args, context) {
  return context.prisma.cancelReasons();
}

module.exports = {
  getUsers,
  getCancelReason
};

// Vous utilisez d’abord les arguments de filtrage, d’ordre et de pagination fournis pour extraire un certain nombre d’ Linkéléments.
// Ensuite, vous utilisez la linksConnectionrequête de l'API client Prisma pour extraire le nombre total d' Linkéléments actuellement stockés dans la base de données.
// Les linkset countsont ensuite encapsulés dans un objet pour adhérer au Feedtype que vous venez d'ajouter au schéma GraphQL.
