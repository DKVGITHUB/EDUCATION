import _ from "lodash";

export const vectorize = (
  items: _.Dictionary<any> | _.NumericDictionary<any> | null | undefined,
  referenceList: any[]
) => {
  return referenceList.map((refItem) => (_.includes(items, refItem) ? 1 : 0));
};

export const getUniqueAttributes = (data: any, attribute: string | number) => {
  const allAttributes = _.flatMap(data, (item) => item[attribute]);
  return _.uniq(allAttributes);
};
