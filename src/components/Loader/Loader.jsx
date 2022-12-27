import { RotatingLines } from 'react-loader-spinner';

import style from './Loader.module.css';

export const Loader = () => {
  return (
    <section className={style.SectionLoader}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="100"
        visible={true}
      />
    </section>
  );
};
