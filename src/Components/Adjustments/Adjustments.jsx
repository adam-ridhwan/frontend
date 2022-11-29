import AllTasksButton from '../Buttons/AllTasksButton/AllTasksButton';
import DotsButton from '../Buttons/DotsButton/DotsButton';
import SearchButton from '../Buttons/SearchButton/SearchButton';
import SortButton from '../Buttons/SortButton/SortButton';
import './Adjustments.styles.css';

const Adjustments = () => {
  return (
    <>
      <div className='adjustments-container'>
        <div className='adjustments-alignment'>
          <AllTasksButton />
          <SortButton />
          <SearchButton />
          <DotsButton />
        </div>
      </div>
    </>
  );
};

export default Adjustments;
