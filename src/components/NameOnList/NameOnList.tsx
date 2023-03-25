import { ReactElement, useState } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import './NameOnList.scss';

interface  INameOnListProps {
    id: number;
    name: string;
    selected: boolean;
    highlighted?: boolean;
};

export const NameOnList = ({name, selected, id}: INameOnListProps): ReactElement => {
    const { currentPage, updateRetroMemberData, updateTechtroMemberData, isRandomizing, nameData, setNameData } = usePageDataContext();
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

    const handleDeletingName = () => {
        if (!isRandomizing) {
            const updatedNameData: any[] = nameData?.filter((data: any) => data?.id !== id);
            setNameData(updatedNameData);

            if (currentPage === 'retro') {
                updateRetroMemberData(updatedNameData);
            } else if (currentPage === 'techtro') {
                updateTechtroMemberData(updatedNameData);
            }
        }
    };

    return (
        <div
            className={`p3 ${selected ? 'selected' : 'non-selected'}`}
            onClick={() => setShowDeleteButton(!showDeleteButton)}
            onMouseEnter={() => setShowDeleteButton(true)}
            onMouseLeave={() => setShowDeleteButton(false)}
        >
            <div className='flex-row d-flex align-items-center name-row'>
                <div className='p-3'>
                    <div className={selected ? 'selected-dot' : 'non-selected-dot'}></div>
                </div>
                <div className='p-9 name-flex'>
                    <span>{name}</span>
                </div>
            </div>
            {showDeleteButton && !selected && <div className='name-delete-btn' onClick={handleDeletingName}>X</div>}
        </div>
    );
};