import { IntlShape, MessageDescriptor } from 'react-intl';

export const formatMessage = (intl: IntlShape, descriptorName: string) => {
  return intl.formatMessage(descriptorName as MessageDescriptor);
};
