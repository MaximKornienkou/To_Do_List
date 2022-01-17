import React, {useEffect, useState} from "react";
import styles from './ErrorModal.module.css';
import {useDispatch} from "react-redux";
import {setError} from "../../reducers/app-reducer";

type PropsType = {
    text: string | null
}

export const ErrorModal = ({text}: PropsType) => {

    const dispatch = useDispatch();

    const [opacity, setOpacity] = useState('1');

    useEffect(() => {
        if (text) {
            setOpacity("1");
        }
        setTimeout(() => {
            setOpacity('0');
            dispatch(setError(""));
        }, 3000);
    }, [text, dispatch]);


    return (
        <span style={{opacity: `${opacity}`}} className={styles.error}>{text}</span>
    );
}