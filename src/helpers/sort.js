export const sortByDate = (compA, compB) => {
  const { date: dateA } = compA.node.frontmatter;
  const { date: dateB } = compB.node.frontmatter;
  const dateObjA = new Date(dateA);
  const dateObjB = new Date(dateB);

  /** Descending (most recent first) */
  if (dateObjA < dateObjB) return 1;
  if (dateObjB < dateObjA) return -1;
  return 0;
};
