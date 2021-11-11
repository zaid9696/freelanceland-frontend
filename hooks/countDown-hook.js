import {useState, useEffect} from 'react';

const useCountDown = ({deliverDate}) => {
  
 const [daysCountDown, setDaysCountDown] = useState(``);
 const [hoursCountDown, setHoursCountDown] = useState(``);
 const [minutesCountDown, setMinutesCountDown] = useState(``);
 const [secondsCountDown, setSecondsCountDown] = useState(``);
    
     useEffect(() => {

      let timer;

      const deliverDateCountDown = () => {

      const end = new Date(deliverDate);
      const newDate = new Date();
      const timeRemaining = end.getTime() - newDate.getTime();


        const secondDi = 1000;
        const minuteDi = secondDi * 60;
        const hourDi = minuteDi * 60;
        const dayDi = hourDi * 24;

        if(timeRemaining < 0){

            clearInterval(timer);

            return
        }

        const days = (Math.floor(timeRemaining / dayDi)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const hours = (Math.floor((timeRemaining % dayDi) / hourDi)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const mintues = (Math.floor((timeRemaining % hourDi) / minuteDi)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const seconds = (Math.floor((timeRemaining % minuteDi) / secondDi)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

        setDaysCountDown(`${days}`);
        setHoursCountDown(`${hours}`);
        setMinutesCountDown(`${mintues}`);
        setSecondsCountDown(`${seconds}`);
      

    }


      
    timer = setInterval(deliverDateCountDown, 1000);

  }, [])

  return {daysCountDown, hoursCountDown, minutesCountDown, secondsCountDown};
}

export default useCountDown;