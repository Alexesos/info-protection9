import { useState } from 'react';

import Service from '../service/Service';
import FileUploader from '../file-load/FileUploader';
import FileDownloader from '../file-load/FileDownloader';
import './app.scss';

const _models = ['RSA', 'El Gamahl']

const App = () => {
    const [message, setMessage] = useState('');
    const [encoded, setEncoded] = useState('');
    const [hash, setHash] = useState('');
    const [keys, setKeys] = useState('');
    const [hashCheck, setHashCheck] = useState('');
    const [sign, setSign] = useState('');
    const [model, setModel] = useState(_models[0]);
    const { writeEQS, readEQS, writeEQS2, readEQS2 } = Service();

    // Renders

    const renderModels = () => {
        return _models.map((md, index) => (
            <li className={`main__item model ${md === model ? 'active' : ''}`}
                key={index}
                onClick={() => {
                    setModel(md);
                    setHash('');
                    setHashCheck('');
                    setEncoded('');
                }}
            >
                {md}
            </li>
        ));
    }

    const hashTableToArray = (arr) => {
        let res = [];

        arr.forEach(item => {
            res.push(...Object.entries(item));
        });

        setEncoded(res);
    }

    // Calls

    const writeEQSCall = async () => {
        const res = await writeEQS(message);
        hashTableToArray(res._hashTable);
        setKeys([res.keys.e, res.keys.n]);
    }

    const readEQSCall = async () => {
        const res = await readEQS(message, keys);
        setHashCheck(res);
        console.log(res);
    }

    const writeEQS2Call = async () => {
        const res = await writeEQS2(message);
        setKeys([res.publicKey.y, res.publicKey.g, res.publicKey.p]);
        setSign([res.signature.a, res.signature.b]);
        console.log(res);
    }

    const readEQS2Call = async () => {
        const publicKey = {y: keys[0], g: keys[1], p: keys[2]};
        const signature = {a: sign[0], b: sign[1]};
        const res = await readEQS2(message, publicKey, signature);
        setHashCheck(res);
        console.log(res);
    }

    const writeCall = () => {
        if (model === 'RSA') {
            console.log('Rsa');
            writeEQSCall();
        }
        if (model === 'El Gamahl') {
            console.log('ElGamal');
            writeEQS2Call();
        }
    }

    const readCall = () => {
        if (model === 'RSA') {
            console.log('Rsa');
            readEQSCall();
        }
        if (model === 'El Gamahl') {
            console.log('ElGamal');
            readEQS2Call();
        }
    }

    return (
        <>
            <main className="main">
                <div className="main__container">
                    <div className="main__start">
                        <FileUploader title={"Текст повідомлення"} setFileText={setMessage} content={message}/>
                        <FileUploader title={"Ключ"} setFileText={setKeys} content={keys}/>
                        {model === 'El Gamahl' && <FileUploader title={"Підпис"} setFileText={setSign} content={sign}/>}
                    </div>
                    <div className="main__mid">
                        <div className="main__block">
                            <h5 className="main__title">
                                Вибір методу хешування
                            </h5>
                            <ul className="main__list">
                                {renderModels()}
                            </ul>
                        </div>
                        <div className="main__block">
                            <h5 className="main__title">
                                Дії
                            </h5>
                            <div className="main__actions">
                                <button 
                                    className="main__button"
                                    onClick={() => writeCall()}    
                                >
                                    Отримати підписане повідомлення та ключ
                                </button>
                                <button 
                                    className="main__button"
                                    onClick={() => readCall()}    
                                >
                                    Перевірка на цілісність
                                </button>
                            </div>
                        </div>
                        <div className="main__block">
                            <h5 className="main__title">
                                Перевірка
                            </h5>
                            <div className="main__conclusion">
                                <span
                                    className={`main__hash ${hashCheck === '' ? 'neutral' : hashCheck ? 'valid' : 'invalid'}`}
                                >
                                    {hashCheck === '' ? 'Очікування перевірки' : hashCheck ? 'Все добре' : 'Файл пошкоджено'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="main__end">
                        <div className="main__downloads">
                            <FileDownloader title={'Вихідне повідомлення'} fileContent={encoded}/>
                            <FileDownloader title={'Ключ'} fileContent={keys}/>
                            {model === 'El Gamahl' && <FileDownloader title={'Підпис'} fileContent={sign}/>}
                        </div>
                        <div className="main__stats">
                            <span>Вихідне повідоилення: {Array.isArray(encoded) && encoded.join(',')}</span>
                            <span>Ключ: {Array.isArray(keys) && keys.join(',')}</span>
                            <span>Підпис: {Array.isArray(sign) && sign.join(',')}</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App;
