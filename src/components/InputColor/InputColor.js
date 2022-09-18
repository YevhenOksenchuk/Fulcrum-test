import {useEffect, useRef, useState} from 'react';
import {Input}     from 'antd';
import styles                        from './styles.module.scss';
import cls                           from 'classnames';

export default function InputColor({ color, onChange }) {
  const [internalColor, setInternalColor] = useState('');
  const inputColor = useRef();

  useEffect(() => {
    setInternalColor(color)
  }, [color])

  const handleChange = (e) => {
    setInternalColor(e.target.value);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  const onClickColorPicker = () => {
    inputColor.current?.click();
  }

  return (
    <>
      <style jsx>{`
        .bgcolor {
          background: ${internalColor};
        }
      `}</style>
      <style jsx global>{`
        .inputColor {
          font-size: 16px;
        }
      `}</style>
      <Input
        value={internalColor.toUpperCase() || ""}
        onChange={(e) => setInternalColor(e.target.value)}
        className={cls(styles.input, 'inputColor')}
        suffix={
        <div
          className={cls(styles.btn, 'bgcolor')}
          onClick={onClickColorPicker}
        >
          <input
            ref={inputColor}
            className={styles.inputColor}
            type="color"
            onChange={handleChange} value={internalColor}
          />
        </div>
        }
      />
    </>
  );
}
