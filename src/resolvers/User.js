function users(parent, args, context) {
  return context.prisma.user({ id: parent.id }).users();
}

module.exports = {
  users
};
