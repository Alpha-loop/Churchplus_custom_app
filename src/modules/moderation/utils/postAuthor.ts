// A social post's author id. item.poster.id is what the original
// feed card compared against the signed-in user (and passed as
// posterUserId when deleting), so it's the confirmed field; the
// others are fallbacks for differently-shaped items. Admin posts
// have none of these, which is exactly what keeps them from ever
// matching a blocked user.
export const getPostAuthorId = (
  item: any
): string | undefined =>
  item?.poster?.id ??
  item?.posterId ??
  item?.posterUserId ??
  undefined;

export const isFromBlockedAuthor = (
  item: any,
  blockedIds: string[]
) => {
  const authorId =
    getPostAuthorId(item);

  return (
    !!authorId &&
    blockedIds.includes(authorId)
  );
};
