import DefaultButton from '../../../../components/defaultButton';

import './styles.scss'

const About = ({ isAvailiable }) => {
  return isAvailiable && <div className="descriptionContainer">
    <div className="description">
      Познакомьтесь с Наруто Узумаки – юным ниндзя, которому предстоит пройти долгий путь к своей мечте. Однако для достижения любой цели нужны верные товарищи, которых Наруто предстоит обрести. Эта история о том, как найти в себе силы не сдаваться, когда никто вокруг не верит в успех. А ещё это исключительная и неповторимая в своём роде классика – самое занимательное приключение ниндзя всех времён!
    </div>
    <div className="buttonWatch">
      <DefaultButton title="Смотреть" />
    </div>
  </div>
}


export default About;