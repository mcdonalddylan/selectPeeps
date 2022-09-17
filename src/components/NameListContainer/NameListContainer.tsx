import { ReactElement } from 'react';
import { NameOnList } from '../NameOnList/NameOnList';
import './NameListContainer.scss';

export const NameListContainer = (): ReactElement => {

    const data = [{ name: 'Bob', selected: 'X' }, { name: 'Willy', selected: 'O' },
            { name: 'Pippy', selected: 'X' }, { name: 'Skippy', selected: 'X' },
            { name: 'Poppy', selected: 'X' }, { name: 'Slippy', selected: 'X' }];
    return (
        <div className='container d-flex name-list-container'>
            <div className='flex-row'>
                {data.map((person, index) => {
                    return (
                        <NameOnList key={index} name={person.name} selected={person.selected} />
                    )
                })}
            </div>
        </div>
    );
};