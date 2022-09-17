import { ReactElement } from 'react';
import { NavBarHeader } from './NavBarHeader/NavBarHeader';
import { SelectPeepsBodyContainer } from './SelectPeepsBodyContainer/SelectPeepsBodyContainer';
import './SelectPeepsWebAppContainer.scss';

export const SelectPeepsWebAppContainer = (): ReactElement => {
  return (
    <>
      <NavBarHeader />
      <SelectPeepsBodyContainer />
    </>
  );
};
