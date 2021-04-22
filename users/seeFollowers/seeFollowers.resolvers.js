import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { userName, lastId }) => {
      // check the user exist
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User Not found",
        };
      }
      const following = await client.user
        .findUnique({ where: { userName } }) //find user
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
