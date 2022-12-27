import style from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div>
      <button className={style.Button} onClick={onClick} type="button">
        Load more
      </button>
    </div>
  );
};

export default Button;
