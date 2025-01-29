import { FC } from 'react'
import { Button, Image} from 'react-bootstrap'
import { NavLink, useNavigate} from 'react-router-dom';
import './InputField.css'
import { ROUTES } from '../Routes'
import imgBasket from './basket.png'
import {getPatronageList, setSearchValue } from '../slices/patronageSlice';
import { useSelector, useDispatch } from 'react-redux'; 
import { RootState, AppDispatch } from '../store';

interface Props {
    value: string
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
    currentCount?: number
    disabilityId?: number
    isLinkDisabled?: boolean
}

const InputField: FC<Props> = (
  { value, 
    loading, 
    placeholder = 'Поиск услуги', 
    buttonTitle = 'Найти', 
     }) => 
    {
      const dispatch = useDispatch<AppDispatch>();
      const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
      const disabilities_id = useSelector((state: RootState) => state.disabilityDraft.id);
      const current_count = useSelector((state: RootState) => state.disabilityDraft.current_count);
      const navigate = useNavigate();
      // Событие нажатия на иконку "корзины"
      const handleClick = (app_id: number | null) => {
          if (app_id == 1) {
            navigate(`${ROUTES.DISABILITY}/${app_id}`);
          }
      };
    return (
    <div className="inputField">
        <input 
          value={value} 
          placeholder={placeholder} 
          onChange={(event => dispatch(setSearchValue(event.target.value)))}/>
        <Button 
          disabled={loading} 
          onClick={() => dispatch(getPatronageList())}>
          {buttonTitle}</Button>
        <NavLink 
              to={!isAuthenticated || !disabilities_id ? '#' : `${ROUTES.DISABILITY}/${disabilities_id}`} // Если нет `disabilities_id`, ссылка неактивна
              className={`basket-container ${!isAuthenticated || !disabilities_id ? 'disabled' : ''}`} // Добавляем `disabled`, если нет ID
              onClick={(e) => {
                if (!disabilities_id) {
                  e.preventDefault(); // Блокируем переход
                  return;
                }
              }}
            >
      <div className="image-container">
        {isAuthenticated && <Image
          src={imgBasket}
          alt="Корзина"
          fluid
          className="basket-image"
        />}
        {isAuthenticated && 
        <p className="basket-num">{current_count}</p>}
      </div>
    </NavLink>
            
    </div>
)
    }
export default InputField