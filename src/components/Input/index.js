import styles from './styles.module.scss';
import { Input } from 'antd';

const InputCustom = ({
                       ...props
                     }) => {
  return (
      <Input
        className={styles.input}
        {...props}
      />
  )
}

export default InputCustom;