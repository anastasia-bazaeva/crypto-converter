import { MenuItem, TextField, Typography } from '@mui/material';
import styles from './currency-line.module.scss';
import { OptionFullName, OptionNameType, OptionType, reqType } from '../../types/types';
import { useEffect, useState } from 'react';
import { useGetRateQuery } from '../../services/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import SyncAltIcon from '@mui/icons-material/SyncAlt';


interface CurLineProps {
    currencyOptions: Array<OptionType>,
}

export const CurrencyForm = ({ currencyOptions }: CurLineProps) => {
    const [amount, setAmount] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [currValueFrom, setCurrValueFrom] = useState<OptionNameType>(OptionNameType.BTC);
    const [currValueTo, setCurrValueTo] = useState<OptionNameType>(OptionNameType.BTC);
    const [fromFirst, setFromFirst] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [message, setMessage] = useState<string>('');
    const [req, setReq] = useState<reqType|null>(null);
    const {data: rate, isSuccess, isError } = useGetRateQuery(req ?? skipToken);


    const handleCurrFromChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrValueFrom(e.target.value as OptionNameType);
      };
    
    const handleCurrToChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrValueTo(e.target.value as OptionNameType);
      };

    const fullNameCurr = (shortName :OptionNameType) => {
        const names = {
            'BTC': OptionFullName.Bitcoin,
            'ETH': OptionFullName.Etheriem,
            'USDT': OptionFullName.Tether
        }
        return names[shortName]
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setReq(null);
        e.preventDefault();
        setFromFirst(true);
        setAmount(Number(e.target.value));
        setReq({
            from: fullNameCurr(currValueFrom),
            to: currValueTo
        })
    }

    const handleAmountChangeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setReq(null);
        e.preventDefault();
        setFromFirst(false);
        setAmount(Number(e.target.value));
        setReq({
            from: fullNameCurr(currValueTo),
            to: currValueFrom
        })
    }
    useEffect(()=>{
        fromFirst
        ? setReq({
            from: fullNameCurr(currValueFrom),
            to: currValueTo
        })
        : setReq({
            from: fullNameCurr(currValueTo),
            to: currValueFrom
        })
    }, [currValueFrom, currValueTo]);

    useEffect(()=>{
      if(isError && amount && amount > 0){
        setError('Сервер не отвечает: произошла ошибка подключения, попробуйте позднее')
      }
    },[isError])

    useEffect(()=>{
        if(rate && isSuccess) {
            const rateObj: Array<object> = Object.values(rate);
            const ratenumber = Number(Object.values(rateObj[0])[0]);
            if(!ratenumber){
                setResult(0)
                setError('Произошла ошибка на сервере: данные о выбранной паре валют не загрузились')
            } else {
                setError(null);
                if(amount && amount !== 0) { 
                    setResult(amount * ratenumber);
                    setMessage(`Курс 1 ${fromFirst 
                        ? fullNameCurr(currValueFrom) 
                        : fullNameCurr(currValueTo)} к 1 ${fromFirst 
                            ? fullNameCurr(currValueTo) 
                            : fullNameCurr(currValueFrom)} составляет ${ratenumber}`)
                } else {
                    setResult(0);
                }
            }
        }
    }, [rate, amount])

    return (
        <>
            <div className={styles.currencyInfo}>
                <>
                    <TextField 
                    sx={{
                        input: {
                            background: '#fdfdfd',
                            borderRadius: '0.3em',
                            }
                        }}
                    id="amountFrom"
                    value={fromFirst ? Number(amount) > 0 ? amount : '' : Number(result) > 0 ? result : ''}
                    onChange={handleAmountChange}
                    type="number"
                    InputProps={{
                        inputProps: { min: 0 }
                        }}/>
                    <TextField 
                    sx={{
                        backgroundColor: '#fdfdfd',
                        borderRadius: '0.3em',
                    }}
                    id="select-currency-from"
                    select
                    defaultValue={OptionNameType.BTC}
                    value={currValueFrom}
                    label={currValueFrom}
                    onChange={handleCurrFromChange}>
                        {currencyOptions.map((option: OptionType) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    </>
                    <SyncAltIcon sx={{
                        alignSelf: 'center'
                    }}/>
                    <>
                    <TextField 
                    sx={{
                        input: {
                            background: '#fdfdfd',
                            borderRadius: '0.3em',
                            }
                        }}
                    id="amountTo"
                    value={fromFirst ? Number(result) > 0 ? result : '' : Number(amount) > 0 ? amount : ''}
                    onChange={handleAmountChangeSecond}
                    type="number"
                    InputProps={{
                        inputProps: { min: 0 }
                        }}/>
                    <TextField 
                    sx={{
                        backgroundColor: '#fdfdfd',
                        borderRadius: '0.3em',
                    }}
                    id="select-currency-to"
                    select
                    defaultValue={OptionNameType.BTC}
                    value={currValueTo}
                    label={currValueTo}
                    onChange={handleCurrToChange}>
                        {currencyOptions.map((option: OptionType) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    </>
            </div>
            {error ? <span><p className={styles.currencyInfo__span}>{error}</p></span>
            : <Typography maxWidth={300} variant='h6' component='h4' sx={{
                alignSelf: 'flex-start'
            }}>{Number(amount) > 0 ? message : ''}</Typography>
            }
        </>
    )
}