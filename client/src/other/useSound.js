import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaySound } from '../redux/timerSlice';
// import alarm from "../resources/alarm.mp3"

function useSound(sound) {
    const [audio] = useState(new Audio(sound));
    const dispatch = useDispatch();
    const { playSound } = useSelector((state) => state.timer);
    
    useEffect(() => {
        if (playSound){
            audio.play();
            dispatch(setPlaySound(false));
        }
    }, [dispatch, audio, playSound]);

}

export default useSound;
