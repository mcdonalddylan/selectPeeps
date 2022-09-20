import { ReactElement } from 'react';
import { BottomActionModal } from './BottomActionModal/BottomActionModal';
import { ChangeLanguageButton } from './ChangeLanguageButton/ChangeLanguageButton';
import { NavBarHeader } from './NavBarHeader/NavBarHeader';
import { SelectPeepsBodyContainer } from './SelectPeepsBodyContainer/SelectPeepsBodyContainer';
import './SelectPeepsWebAppContainer.scss';

export const SelectPeepsWebAppContainer = (): ReactElement => {
  return (
    <>
      <NavBarHeader />
      <SelectPeepsBodyContainer />
      <BottomActionModal />
      <ChangeLanguageButton />
    </>
  );
};
