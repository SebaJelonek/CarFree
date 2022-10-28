import { useAtom } from 'jotai';
import { CarArrayType, isLoggedInAtom } from '../../../Atoms';
import Card from '../Card/Card';

const edit = (
  <svg
    className='h-[27.4px] filter-current filter-blue transition-all duration-250'
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
  </svg>
);

const trash = (
  <svg
    className='w-6 ml-3 filter-current filter-red transition-all duration-150'
    viewBox='0 0 448 512'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M53.21 467c1.562 24.84 23.02 45 47.9 45h245.8c24.88 0 46.33-20.16 47.9-45L416 128H32L53.21 467zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z' />
  </svg>
);

interface Props {
  carArray: CarArrayType['carArray'];
  setId: React.Dispatch<React.SetStateAction<string>>;
  toggle: React.Dispatch<React.SetStateAction<'edit' | 'delete' | 'false'>>;
}

const DisplayCars: React.FC<Props> = ({ carArray, setId, toggle }) => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const clickHandler = (event: any) => {
    const title = event.currentTarget.title;
    // editHandler(event);

    if (title.toLowerCase() === 'edit') {
      setId(event.currentTarget.id);
      toggle('edit');
    }
    if (title.toLowerCase() === 'delete') {
      setId(event.currentTarget.id);
      toggle('delete');
    }
  };

  return (
    <div className='w-full'>
      {carArray.map(({ _id, brand, model, milage, year }) => (
        <Card width='w-4/5' key={_id}>
          <div className='flex justify-end'>
            {isLoggedIn ? (
              <div className='h-[27.4px]'>
                <div
                  id={_id}
                  title='Edit'
                  onClick={clickHandler}
                  className='w-fit inline-block'
                >
                  {edit}
                </div>

                <div
                  id={_id}
                  title='Delete'
                  onClick={clickHandler}
                  className='w-fit inline-block'
                >
                  {trash}
                </div>
              </div>
            ) : (
              <div className='h-[27.4px]'></div>
            )}
          </div>
          <div className='flex justify-center'>
            <h2 className='text-2xl mx-4 border-b-2'>{brand}</h2>
            <h2 className='text-2xl mx-4 border-b-2'>{model}</h2>
          </div>
          <div className='flex justify-center mt-6'>
            <h3 className=' text-xl mx-4 border-b-2'>Przebieg: {milage}km</h3>
            <h3 className=' text-xl mx-4 border-b-2'>Rocznik: {year}</h3>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default DisplayCars;
