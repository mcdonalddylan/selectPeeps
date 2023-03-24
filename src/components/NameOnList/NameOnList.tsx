import { ReactElement } from 'react';
import './NameOnList.scss';

interface  INameOnListProps {
    name: string;
    selected: boolean;
    highlighted?: boolean;
};

export const NameOnList = ({name, selected}: INameOnListProps): ReactElement => {
    return (
        <div className={`p3 ${selected ? 'selected' : 'non-selected'}`}>
            <div className='flex-row d-flex align-items-center name-row'>
                <div className='p-3'>
                    <div className={selected ? 'selected-dot' : 'non-selected-dot'}></div>
                </div>
                <div className='p-9 name-flex'>
                    <span>{name}</span>
                </div>
            </div>
        </div>
    );
};