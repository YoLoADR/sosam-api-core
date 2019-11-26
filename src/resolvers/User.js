function postUser(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createUser({
    url: args.url,
    description: args.description
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
      isAdmin: args.isAdmin
    }
  });
  return updatedUser;
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

module.exports = {
  postUser,
  updateUser,
  deleteUser
};
